import pyarrow as pa
import pyarrow.compute as pc
from dagster import AssetExecutionContext, Output, asset
from pandas import ArrowDtype, DataFrame, Series

from lakehouse.partitions import hourly_partitions
from lakehouse.resources.hn_resource import HNClient

from .id_range_for_time import id_range_for_time

HN_ITEMS_SCHEMA = pa.schema(
    [
        pa.field("id", pa.int64()),
        pa.field("parent", pa.float64()),
        pa.field("time", pa.int64()),
        pa.field("type", pa.string()),
        pa.field("by", pa.string()),
        pa.field("text", pa.string()),
        pa.field("kids", pa.list_(pa.int64())),
        pa.field("score", pa.float64()),
        pa.field("title", pa.string()),
        pa.field("descendants", pa.float64()),
        pa.field("url", pa.string()),
    ]
)

ITEM_FIELD_NAMES = HN_ITEMS_SCHEMA.names


@asset(
    io_manager_key="delta_io_manager",
    partitions_def=hourly_partitions,
    key_prefix=["core"],
    metadata={"partition_expr": "hour"},
)
def items(context: AssetExecutionContext, hn_client: HNClient) -> Output[DataFrame]:
    """Items from the Hacker News API: each is a story or a comment on a story."""
    (start_id, end_id), item_range_metadata = id_range_for_time(context, hn_client)

    context.log.info(
        f"Downloading range {start_id} up to {end_id}: {end_id - start_id} items."
    )

    rows = []
    for item_id in range(start_id, end_id):
        rows.append(hn_client.fetch_item_by_id(item_id))
        if len(rows) % 100 == 0:
            context.log.info(f"Downloaded {len(rows)} items!")

    non_none_rows = [row for row in rows if row is not None]
    result = DataFrame(non_none_rows, columns=ITEM_FIELD_NAMES).drop_duplicates(
        subset=["id"]
    )
    result.rename(columns={"by": "user_id"}, inplace=True)

    start, end = context.asset_partitions_time_window_for_output()

    hour_series = Series(
        [start] * result.shape[0], name="hour", dtype=ArrowDtype(pa.timestamp("us"))
    )
    result.insert(0, "hour", hour_series)

    return Output(
        result,
        metadata={
            "Non-empty items": len(non_none_rows),
            "Empty items": rows.count(None),
            **item_range_metadata,
        },
    )


@asset(
    io_manager_key="delta_io_manager",
    partitions_def=hourly_partitions,
    key_prefix=["core"],
    metadata={"partition_expr": "hour"},
)
def comments(items: pa.Table) -> pa.Table:
    return items.filter(pc.field("type") == "comment")


@asset(
    io_manager_key="delta_io_manager",
    partitions_def=hourly_partitions,
    key_prefix=["core"],
    metadata={"partition_expr": "hour"},
)
def stories(items: pa.Table) -> pa.Table:
    return items.filter(pc.field("type") == "story")

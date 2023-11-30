import pyarrow as pa
import pyarrow.acero as acero
import pyarrow.compute as pc
import pyarrow.dataset as ds
from dagster import AssetIn, asset

from .constants import ASSET_PREFIX, DATA_PARTITION

selected_columns = [
    "trip_duration_minutes",
    "average_velocity_kmh",
    "pickup_day",
    "pickup_hour",
    "passenger_count",
    "trip_distance",
    "fare_amount",
]

aggregate_fn_names = ["mean", "max", "min"]
aggregate_fns = [pc.mean, pc.max, pc.min]


@asset(
    key_prefix=ASSET_PREFIX,
    partitions_def=DATA_PARTITION,
    compute_kind="acero",
    description="Overall table statistics for taxi trips data.",
    op_tags={"format": "delta"},
    metadata={"partition_expr": "month"},
    io_manager_key="delta_io_manager",
)
def yellow_cab_trips_stats_acero(
    yellow_cab_trips_merged_acero: ds.Dataset
) -> pa.RecordBatchReader:
    stats = acero.Declaration(
        factory_name="aggregate",
        options=acero.AggregateNodeOptions(
            aggregates=[
                (col, fn, None, f"{fn}_{col}")
                for col in selected_columns
                for fn in aggregate_fn_names
            ]
        ),
        inputs=[
            acero.Declaration(
                factory_name="scan",
                options=acero.ScanNodeOptions(yellow_cab_trips_merged_acero),
            )
        ],
    )

    return stats.to_reader()


@asset(
    key_prefix=ASSET_PREFIX,
    partitions_def=DATA_PARTITION,
    compute_kind="acero",
    description="Overall table statistics for taxi trips data.",
    metadata={"partition_expr": "month"},
    op_tags={"format": "delta"},
    io_manager_key="delta_io_manager",
)
def yellow_cab_trips_grouped_stats_acero(
    yellow_cab_trips_merged_acero: ds.Dataset
) -> pa.RecordBatchReader:
    stats = acero.Declaration(
        factory_name="aggregate",
        options=acero.AggregateNodeOptions(
            aggregates=[
                (col, f"hash_{fn}", None, f"{fn}_{col}")
                for col in selected_columns
                for fn in aggregate_fn_names
            ],
            keys=[pc.field("month")],
        ),
        inputs=[
            acero.Declaration(
                factory_name="scan",
                options=acero.ScanNodeOptions(yellow_cab_trips_merged_acero),
            )
        ],
    )

    return stats.to_reader()


@asset(
    key_prefix=ASSET_PREFIX,
    partitions_def=DATA_PARTITION,
    compute_kind="arrow",
    description="Overall table statistics for taxi trips data.",
    metadata={"partition_expr": "month"},
    op_tags={"format": "delta"},
    io_manager_key="delta_io_manager",
    ins={
        "yellow_cab_trips_merged_arrow": AssetIn(
            key="yellow_cab_trips_merged_arrow",  # metadata={"columns": selected_columns}
        ),
    },
)
def yellow_cab_trips_stats_arrow(
    context, yellow_cab_trips_merged_arrow: pa.Table
) -> pa.Table:
    context.log.info(yellow_cab_trips_merged_arrow.to_pandas().head())
    stats = pa.Table.from_arrays(
        [
            pa.array([fn(yellow_cab_trips_merged_arrow.column(col))])
            for col in selected_columns
            for fn in aggregate_fns
        ],
        names=[f"{fn}_{col}" for col in selected_columns for fn in aggregate_fn_names],
    )
    stats = stats.append_column(
        "month", yellow_cab_trips_merged_arrow.column("month")[:1]
    )

    return stats

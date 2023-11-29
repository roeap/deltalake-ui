import pyarrow as pa
import pyarrow.acero as acero
import pyarrow.dataset as ds
from dagster import AssetIn, asset

from .cleaned import columns
from .constants import ASSET_PREFIX, DATA_PARTITION

selected_columns = [
    *columns,
    "trip_duration_minutes",
    "average_velocity_kmh",
    "pickup_day",
    "pickup_hour",
]


@asset(
    key_prefix=ASSET_PREFIX,
    partitions_def=DATA_PARTITION,
    compute_kind="acero",
    description="Merge zone and borough information into taxi trips data.",
    metadata={"partition_expr": "month"},
    op_tags={"format": "delta"},
    io_manager_key="delta_io_manager",
    ins={
        "yellow_cab_trips_cleaned_acero": AssetIn(key="yellow_cab_trips_cleaned_acero"),
        "taxi_zones_lookup": AssetIn(
            key="taxi_zones_lookup", metadata={"format": "csv"}
        ),
    },
)
def yellow_cab_trips_merged_acero(
    yellow_cab_trips_cleaned_acero: ds.Dataset,
    taxi_zones_lookup: pa.Table,
) -> pa.RecordBatchReader:
    joined = acero.Declaration(
        factory_name="hashjoin",
        options=acero.HashJoinNodeOptions(
            join_type="left outer",
            left_keys="pickup_location_id",
            left_output=selected_columns,
            right_keys="location_id",
            right_output=["borough", "zone", "service_zone"],
        ),
        inputs=[
            acero.Declaration(
                factory_name="scan",
                options=acero.ScanNodeOptions(yellow_cab_trips_cleaned_acero),
            ),
            acero.Declaration(
                factory_name="table_source",
                options=acero.TableSourceNodeOptions(taxi_zones_lookup),
            ),
        ],
    )

    return joined.to_reader()


@asset(
    key_prefix=ASSET_PREFIX,
    partitions_def=DATA_PARTITION,
    compute_kind="arrow",
    description="Merge zone and borough information into taxi trips data.",
    metadata={"partition_expr": "month"},
    op_tags={"format": "delta"},
    io_manager_key="delta_io_manager",
    ins={
        "yellow_cab_trips_cleaned_arrow": AssetIn(
            key="yellow_cab_trips_cleaned_arrow", metadata={"columns": selected_columns}
        ),
        "taxi_zones_lookup": AssetIn(
            key="taxi_zones_lookup", metadata={"format": "csv"}
        ),
    },
)
def yellow_cab_trips_merged_arrow(
    yellow_cab_trips_cleaned_arrow: pa.Table,
    taxi_zones_lookup: pa.Table,
) -> pa.Table:
    joined = yellow_cab_trips_cleaned_arrow.join(
        taxi_zones_lookup,
        keys="pickup_location_id",
        right_keys="location_id",
        join_type="left outer",
    )
    return joined

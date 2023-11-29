import datetime as dt

import pyarrow as pa
import pyarrow.acero as acero
import pyarrow.compute as pc
import pyarrow.dataset as ds
from dagster import AssetIn, asset

from .constants import ASSET_PREFIX, DATA_PARTITION

columns = [
    "month",
    "pickup_datetime",
    "dropoff_datetime",
    "passenger_count",
    "trip_distance",
    "pickup_location_id",
    "dropoff_location_id",
    "payment_type",
    "fare_amount",
    "extra",
    "mta_tax",
    "tip_amount",
    "tolls_amount",
    "improvement_surcharge",
    "total_amount",
]

expressions = [
    *[pc.field(col) for col in columns],
    pc.divide(
        pc.subtract(pc.field("dropoff_datetime"), pc.field("pickup_datetime")),
        pa.scalar(dt.timedelta(minutes=1)),
    ),
    pc.divide(
        pc.multiply(pc.field("trip_distance"), pc.scalar(1.609344)),
        pc.divide(
            pc.subtract(pc.field("dropoff_datetime"), pc.field("pickup_datetime")),
            pa.scalar(dt.timedelta(hours=1)),
        ),
    ),
    pc.day_of_week(pc.field("pickup_datetime")),
    pc.hour(pc.field("pickup_datetime")),
]


@asset(
    key_prefix=ASSET_PREFIX,
    ins={"yellow_cab_trips": AssetIn(key="yellow_cab_trips")},
    partitions_def=DATA_PARTITION,
    compute_kind="acero",
    description="Filter vector for selecting test samples from dataset.",
    metadata={"partition_expr": "month"},
    op_tags={"format": "delta"},
    io_manager_key="delta_io_manager",
)
def yellow_cab_trips_cleaned(yellow_cab_trips: ds.Dataset) -> pa.RecordBatchReader:
    project = acero.Declaration(
        factory_name="project",
        options=acero.ProjectNodeOptions(
            expressions=expressions,
            names=[
                *columns,
                "trip_duration_minutes",
                "average_velocity_kmh",
                "pickup_day",
                "pickup_hour",
            ],
        ),
        inputs=[
            acero.Declaration(
                factory_name="scan", options=acero.ScanNodeOptions(yellow_cab_trips)
            )
        ],
    )
    return project.to_reader()

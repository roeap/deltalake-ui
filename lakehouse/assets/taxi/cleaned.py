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

conditions = [
    pc.is_valid(pc.field("pickup_location_id")),
    pc.is_valid(pc.field("dropoff_location_id")),
    pc.is_valid(pc.field("average_velocity_kmh")),
    pc.greater(pc.field("trip_distance"), pc.scalar(0.0)),
    pc.greater(pc.field("passenger_count"), pc.scalar(0.0)),
    pc.less(pc.field("passenger_count"), pc.scalar(10.0)),
    pc.greater(pc.field("trip_duration_minutes"), pc.scalar(1.0)),
    pc.less(pc.field("trip_duration_minutes"), pc.scalar(60.0)),
    pc.greater(pc.field("average_velocity_kmh"), pc.scalar(1.0)),
    pc.less(pc.field("average_velocity_kmh"), pc.scalar(100.0)),
]


@asset(
    key_prefix=ASSET_PREFIX,
    ins={"yellow_cab_trips": AssetIn(key="yellow_cab_trips")},
    partitions_def=DATA_PARTITION,
    compute_kind="acero",
    description="Augmented and cleaned taxi trips data.",
    metadata={"partition_expr": "month"},
    op_tags={"format": "delta"},
    io_manager_key="delta_io_manager",
)
def yellow_cab_trips_cleaned_acero(
    yellow_cab_trips: ds.Dataset
) -> pa.RecordBatchReader:
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
    table = project
    for condition in conditions:
        table = acero.Declaration(
            factory_name="filter",
            options=acero.FilterNodeOptions(filter_expression=condition),
            inputs=[table],
        )

    return table.to_reader()


@asset(
    key_prefix=ASSET_PREFIX,
    partitions_def=DATA_PARTITION,
    compute_kind="arrow",
    description="Augmented and cleaned taxi trips data.",
    metadata={"partition_expr": "month", "columns": columns},
    op_tags={"format": "delta"},
    io_manager_key="delta_io_manager",
)
def yellow_cab_trips_cleaned_arrow(yellow_cab_trips: pa.Table) -> pa.Table:
    yellow_cab_trips = yellow_cab_trips.append_column(
        "trip_duration_minutes",
        pc.divide(
            pc.subtract(
                yellow_cab_trips.column("dropoff_datetime"),
                yellow_cab_trips.column("pickup_datetime"),
            ),
            pa.scalar(dt.timedelta(minutes=1)),
        ),
    )
    yellow_cab_trips = yellow_cab_trips.append_column(
        "average_velocity_kmh",
        pc.divide(
            pc.multiply(yellow_cab_trips.column("trip_distance"), pa.scalar(1.609344)),
            pc.divide(
                pc.subtract(
                    yellow_cab_trips.column("dropoff_datetime"),
                    yellow_cab_trips.column("pickup_datetime"),
                ),
                pa.scalar(dt.timedelta(hours=1)),
            ),
        ),
    )
    yellow_cab_trips = yellow_cab_trips.append_column(
        "pickup_day", pc.day_of_week(yellow_cab_trips.column("pickup_datetime"))
    )
    yellow_cab_trips = yellow_cab_trips.append_column(
        "pickup_hour", pc.hour(yellow_cab_trips.column("pickup_datetime"))
    )
    yellow_cab_trips = yellow_cab_trips.filter(
        pc.is_valid(yellow_cab_trips.column("pickup_location_id"))
        and pc.is_valid(yellow_cab_trips.column("dropoff_location_id"))
        and pc.is_valid(yellow_cab_trips.column("average_velocity_kmh"))
        and pc.greater(yellow_cab_trips.column("trip_distance"), pa.scalar(0.0))
        and pc.greater(yellow_cab_trips.column("passenger_count"), pa.scalar(0.0))
        and pc.less(yellow_cab_trips.column("passenger_count"), pa.scalar(10.0))
        and pc.greater(yellow_cab_trips.column("trip_duration_minutes"), pa.scalar(1.0))
        and pc.less(yellow_cab_trips.column("trip_duration_minutes"), pa.scalar(60.0))
        and pc.greater(yellow_cab_trips.column("average_velocity_kmh"), pa.scalar(1.0))
        and pc.less(yellow_cab_trips.column("average_velocity_kmh"), pa.scalar(100.0))
    )
    return yellow_cab_trips

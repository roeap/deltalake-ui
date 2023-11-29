import datetime as dt

import pyarrow as pa
import pyarrow.parquet as pq
import requests
from dagster import OpExecutionContext, asset

from .constants import ASSET_PREFIX, DATA_PARTITION

_BASE_URL = "https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_{}.parquet"

_TAXI_SCHEMA_RAW = pa.schema(
    [
        pa.field("VendorID", pa.int64()),
        pa.field("tpep_pickup_datetime", pa.timestamp("us")),
        pa.field("tpep_dropoff_datetime", pa.timestamp("us")),
        pa.field("passenger_count", pa.float64()),
        pa.field("trip_distance", pa.float64()),
        pa.field("RatecodeID", pa.float64()),
        pa.field("store_and_fwd_flag", pa.string()),
        pa.field("PULocationID", pa.int64()),
        pa.field("DOLocationID", pa.int64()),
        pa.field("payment_type", pa.int64()),
        pa.field("fare_amount", pa.float64()),
        pa.field("extra", pa.float64()),
        pa.field("mta_tax", pa.float64()),
        pa.field("tip_amount", pa.float64()),
        pa.field("tolls_amount", pa.float64()),
        pa.field("improvement_surcharge", pa.float64()),
        pa.field("total_amount", pa.float64()),
        pa.field("congestion_surcharge", pa.float64()),
        pa.field("airport_fee", pa.float64()),
    ]
)


_RENAME_MAP = {
    "VendorID": "vendor_id",
    "PULocationID": "pickup_location_id",
    "DOLocationID": "dropoff_location_id",
    "RatecodeID": "ratecode_id",
    "tpep_pickup_datetime": "pickup_datetime",
    "tpep_dropoff_datetime": "dropoff_datetime",
}


@asset(
    key_prefix=ASSET_PREFIX,
    partitions_def=DATA_PARTITION,
    description="Yellow Taxi Trip Records",
    metadata={"partition_expr": "month"},
    compute_kind="arrow",
    code_version="1.0",
    op_tags={"format": "delta"},
    io_manager_key="delta_io_manager",
)
def yellow_cab_trips(context: OpExecutionContext) -> pa.Table:
    # download TLC yellow cab data
    partition_key = context.asset_partition_key_for_output()
    url = _BASE_URL.format(partition_key[:-3])
    context.log.debug(f"loading data from: {url}")
    response = requests.get(url, timeout=500)
    table = pq.read_table(pa.py_buffer(response.content), schema=_TAXI_SCHEMA_RAW)

    # rename columns
    columns = [_RENAME_MAP.get(col, col) for col in table.column_names]
    table = table.rename_columns(columns)
    table = table.drop_columns(["airport_fee", "congestion_surcharge"])

    # add partition column
    date = dt.datetime.fromisoformat(partition_key).date()
    table = table.add_column(
        0,
        pa.field("month", pa.date32()),
        pa.array([date] * table.shape[0], pa.date32()),
    )

    return table

import pyarrow as pa
import pyarrow.parquet as pq
import requests
from dagster import MonthlyPartitionsDefinition, OpExecutionContext, asset

_ASSET_PREFIX = ["taxi"]
_BASE_URL = "https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_{}.parquet"
DATA_PARTITION = MonthlyPartitionsDefinition(start_date="2015-01-01")

_TAXI_SCHEMA_RAW = pa.schema(
    [
        pa.field("year", pa.int64()),
        pa.field("month", pa.int64()),
        pa.field("vendor_id", pa.int64()),
        pa.field("tpep_pickup_datetime", pa.timestamp("us")),
        pa.field("tpep_dropoff_datetime", pa.timestamp("us")),
        pa.field("passenger_count", pa.float64()),
        pa.field("trip_distance", pa.float64()),
        pa.field("ratecode_id", pa.float64()),
        pa.field("store_and_fwd_flag", pa.string()),
        pa.field("pu_location_id", pa.int64()),
        pa.field("do_location_id", pa.int64()),
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
    "PULocationID": "pu_location_id",
    "DOLocationID": "do_location_id",
    "RatecodeID": "ratecode_id",
}


@asset(
    key_prefix=_ASSET_PREFIX,
    io_manager_key="delta_io_manager",
    partitions_def=DATA_PARTITION,
    description="New York Taxi data loaded from authority.",
    metadata={"partition_by": ["year", "month"]},
    compute_kind="delta",
    # config_schema={"iterations": int}
)
def yellow_cab_trips(context: OpExecutionContext) -> pa.Table:
    # asset_partition_key is encoded as YYYY-MM--DD
    partition_key = context.asset_partition_key_for_output()
    url = _BASE_URL.format(partition_key[:-3])
    context.log.debug(f"loading data from: {url}")
    response = requests.get(url, timeout=500)
    table = pq.read_table(pa.py_buffer(response.content), schema=_TAXI_SCHEMA_RAW)
    columns = [_RENAME_MAP.get(col, col) for col in table.column_names]
    table = table.rename_columns(columns)
    table = table.add_column(
        0, pa.field("year", pa.int64()), [[int(partition_key[:4])] * table.shape[0]]
    )
    table = table.add_column(
        1, pa.field("month", pa.int64()), [[int(partition_key[5:-3])] * table.shape[0]]
    )
    return table


@asset(
    key_prefix=_ASSET_PREFIX,
    io_manager_key="delta_io_manager",
    # ins={"raw": AssetIn(key_prefix=_ASSET_PREFIX)},
    partitions_def=DATA_PARTITION,
    compute_kind="delta",
    description="Filter vector for selecting test samples from dataset.",
)
def refined(
    context: OpExecutionContext,
    yellow_cab_trips: pa.Table,
    boroughs,
    zones,
    zone_to_borough,
) -> pa.Table:
    return yellow_cab_trips

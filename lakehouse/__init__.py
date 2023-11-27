from dagster import Definitions
from dagster_deltalake import LocalConfig
from dagster_deltalake_pandas import DeltaLakePandasIOManager

from .assets import (
    # activity_analytics_assets,
    core_assets,
    recommender_assets,
    taxi_assets,
)
from .hn_resource import HNAPISubsampleClient

all_assets = [
    *core_assets,
    *recommender_assets,
    *taxi_assets,
    # *activity_analytics_assets,
]

defs = Definitions(
    assets=all_assets,
    resources={
        "delta_io_manager": DeltaLakePandasIOManager(
            root_uri="./.data",
            storage_options=LocalConfig(),
        ),
        "hn_client": HNAPISubsampleClient(subsample_rate=10),
    },
)

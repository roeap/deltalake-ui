import pandas as pd
from dagster import Definitions, asset
from dagster_deltalake import LocalConfig
from dagster_deltalake_pandas import DeltaLakePandasIOManager
from .hn_resource import HNAPIClient, HNAPISubsampleClient

from .assets import (
    # activity_analytics_assets,
    core_assets,
    recommender_assets,
)


all_assets = [
    *core_assets,
    *recommender_assets,
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

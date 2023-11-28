from dagster import Definitions

from .assets import (
    core_assets,
    recommender_assets,
    taxi_assets,
)
from .resources import resources

defs = Definitions(
    assets=[
        *core_assets,
        *recommender_assets,
        *taxi_assets,
        # *activity_analytics_assets,
    ],
    resources=resources,
)

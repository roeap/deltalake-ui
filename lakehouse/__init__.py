import warnings

from dagster import Definitions, ExperimentalWarning

from .assets import core_assets, recommender_assets, taxi_assets
from .resources import resources

warnings.filterwarnings("ignore", category=ExperimentalWarning)

defs = Definitions(
    assets=[*core_assets, *recommender_assets, *taxi_assets],
    resources=resources,
)

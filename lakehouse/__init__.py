import warnings

from dagster import Definitions, ExperimentalWarning

from .assets import taxi_assets
from .resources import resources
from .sensors import optimize_arrow_cleaned, optimize_sensor

warnings.filterwarnings("ignore", category=ExperimentalWarning)

defs = Definitions(
    jobs=[optimize_arrow_cleaned],
    sensors=[optimize_sensor],
    assets=taxi_assets,
    resources=resources,
)

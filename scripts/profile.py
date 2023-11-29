import sys

from dagster import materialize

from lakehouse.assets.taxi import (
    yellow_cab_trips,
    yellow_cab_trips_cleaned_acero,
    yellow_cab_trips_cleaned_arrow,
)
from lakehouse.resources import resources


def acero():
    materialize(
        assets=[yellow_cab_trips, yellow_cab_trips_cleaned_acero],
        selection=[yellow_cab_trips_cleaned_acero],
        resources=resources,
        partition_key="2022-06-01",
    )


def arrow():
    materialize(
        assets=[yellow_cab_trips, yellow_cab_trips_cleaned_arrow],
        selection=[yellow_cab_trips_cleaned_arrow],
        resources=resources,
        partition_key="2022-06-01",
    )


match sys.argv[1]:
    case "acero":
        acero()
    case "arrow":
        arrow()
    case _:
        print("Unknown command")

import sys

from dagster import materialize

from lakehouse.assets.taxi import yellow_cab_trips, yellow_cab_trips_cleaned
from lakehouse.resources import resources


def acero():
    materialize(
        assets=[yellow_cab_trips, yellow_cab_trips_cleaned],
        selection=[yellow_cab_trips_cleaned],
        resources=resources,
        partition_key="2022-06-01",
    )


match sys.argv[1]:
    case "acero":
        acero()
    case _:
        print("Unknown command")

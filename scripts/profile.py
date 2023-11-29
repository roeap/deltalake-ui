import sys

from dagster import materialize

from lakehouse.assets.taxi import (
    taxi_zones_lookup,
    yellow_cab_trips,
    yellow_cab_trips_cleaned_acero,
    yellow_cab_trips_cleaned_arrow,
    yellow_cab_trips_merged_acero,
    yellow_cab_trips_merged_arrow,
)
from lakehouse.resources import resources


def acero():
    materialize(
        assets=[yellow_cab_trips, yellow_cab_trips_cleaned_acero],
        selection=[yellow_cab_trips_cleaned_acero],
        resources=resources,
        partition_key="2023-06-01",
    )


def acero_merge():
    materialize(
        assets=[
            taxi_zones_lookup,
            yellow_cab_trips,
            yellow_cab_trips_cleaned_acero,
            yellow_cab_trips_merged_acero,
        ],
        selection=[yellow_cab_trips_merged_acero],
        resources=resources,
        partition_key="2023-06-01",
    )


def arrow():
    materialize(
        assets=[yellow_cab_trips, yellow_cab_trips_cleaned_arrow],
        selection=[yellow_cab_trips_cleaned_arrow],
        resources=resources,
        partition_key="2023-06-01",
    )


def arrow_merge():
    materialize(
        assets=[
            taxi_zones_lookup,
            yellow_cab_trips,
            yellow_cab_trips_cleaned_arrow,
            yellow_cab_trips_merged_arrow,
        ],
        selection=[yellow_cab_trips_merged_arrow],
        resources=resources,
        partition_key="2023-06-01",
    )


match sys.argv[1]:
    case "acero":
        acero()
    case "acero_merge":
        acero_merge()
    case "arrow":
        arrow()
    case "arrow_merge":
        arrow_merge()
    case _:
        print("Unknown command")

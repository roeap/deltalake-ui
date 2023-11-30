import sys

from dagster import materialize

from lakehouse.assets.taxi import (
    taxi_zones_lookup,
    yellow_cab_trips,
    yellow_cab_trips_cleaned_acero,
    yellow_cab_trips_cleaned_arrow,
    yellow_cab_trips_merged_acero,
    yellow_cab_trips_merged_arrow,
    yellow_cab_trips_stats_acero,
    yellow_cab_trips_stats_arrow,
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


def acero_stats():
    materialize(
        assets=[
            taxi_zones_lookup,
            yellow_cab_trips,
            yellow_cab_trips_cleaned_acero,
            yellow_cab_trips_merged_acero,
            yellow_cab_trips_stats_acero,
        ],
        selection=[yellow_cab_trips_stats_acero],
        resources=resources,
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


def arrow_stats():
    materialize(
        assets=[
            taxi_zones_lookup,
            yellow_cab_trips,
            yellow_cab_trips_cleaned_arrow,
            yellow_cab_trips_merged_arrow,
            yellow_cab_trips_stats_arrow,
        ],
        selection=[yellow_cab_trips_stats_arrow],
        resources=resources,
    )


match sys.argv[1]:
    case "acero":
        acero()
    case "acero_merge":
        acero_merge()
    case "acero_stats":
        acero_stats()
    case "arrow":
        arrow()
    case "arrow_merge":
        arrow_merge()
    case "arrow_stats":
        arrow_stats()
    case _:
        print("Unknown command")

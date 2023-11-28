import collections

import numpy as np
from dagster import (
    AssetIn,
    AssetKey,
    AssetOut,
    Output,
    SourceAsset,
    multi_asset,
)

taxi_zones_geo = SourceAsset(
    key=AssetKey("taxi_zones_geo"),
    description="Raw GeoJSON for NY taxi zones",
    metadata={"format": "json"},
    io_manager_key="object_store_io_manager",
)

taxi_zones_lookup = SourceAsset(
    key=AssetKey("taxi_zones_lookup"),
    description="Raw GeoJSON for NY taxi zones",
    metadata={"format": "csv"},
    io_manager_key="object_store_io_manager",
)


@multi_asset(
    ins={"taxi_zones_geo": AssetIn(key="taxi_zones_geo", metadata={"format": "json"})},
    outs={
        "boroughs": AssetOut(description="Borough identifiers"),
        "zones": AssetOut(description="Zone identifiers"),
        "zone_to_borough": AssetOut(description="Mapping zones to boroughs"),
    },
)
def geo_data(taxi_zones_geo: dict):
    """Extracts boroughs, zones, and zone_to_borough from taxi_zones."""

    features = taxi_zones_geo["features"]
    borough_polygons = collections.defaultdict(list)
    zone_polygons = collections.defaultdict(list)
    zone_to_borough = {}

    for _, feature in enumerate(features[:]):
        properties = feature["properties"]
        geo = feature["geometry"]

        polygons = []
        for polygon in geo["coordinates"]:
            polygon = np.array(polygon)
            if polygon.ndim == 3:
                polygon = polygon[0]
            polygon = polygon.T
            polygons.append(polygon)

        borough_polygons[properties["borough"]].extend(polygons)
        zone_polygons[properties["zone"]].extend(polygons)
        zone_to_borough[properties["zone"]] = properties["borough"]

    # bmapper
    keys = list(borough_polygons.keys())
    yield Output(value={i: keys[i] for i in range(len(keys))}, output_name="boroughs")

    # zmapper
    keys = list(zone_polygons.keys())
    yield Output(value={i: keys[i] for i in range(len(keys))}, output_name="zones")

    # zone_to_borough
    yield Output(value=zone_to_borough, output_name="zone_to_borough")

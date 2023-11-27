import collections

import numpy as np
from dagster import (
    AssetKey,
    AssetOut,
    SourceAsset,
    multi_asset,
)

taxi_zones = SourceAsset(
    key=AssetKey("taxi_zones"),
    description="Raw GeoJSON for NY taxi zones",
    metadata={"format": "csv"},
    # io_manager_key="object_store_io",
)


# @observable_source_asset(name="taxi_zones")
# def taxi_zones(context):
#     hash_sig = sha256()
#     hash_sig.update(content)
#     return LogicalVersion(hash_sig.hexdigest())


@multi_asset(
    outs={
        "boroughs": AssetOut(description="Borough identifiers"),
        "zones": AssetOut(description="Zone identifiers"),
        "zone_to_borough": AssetOut(description="Mapping zones to boroughs"),
    },
)
def geo_data(taxi_zones: dict):
    features = taxi_zones["features"]
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
    yield {i: keys[i] for i in range(len(keys))}

    # zmapper
    keys = list(zone_polygons.keys())
    yield {i: keys[i] for i in range(len(keys))}

    # zone_to_borough
    yield zone_to_borough

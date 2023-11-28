import json
from io import BytesIO
from typing import Any, Optional

from dagster import (
    InitResourceContext,
    InputContext,
    IOManager,
    OutputContext,
    StringSource,
    io_manager,
)
from object_store import ObjectStore
from pyarrow import csv


class ObjectStoreIoManager(IOManager):
    def __init__(
        self, location: str, storage_options: Optional[dict[str, str]] = None
    ) -> None:
        self._store = ObjectStore(location, options=storage_options)

    def load_input(self, context: InputContext) -> Any:
        format = context.metadata.get("format")

        data = self._store.get(f"{'/'.join(context.asset_key.path)}.{format}")

        if format == "json":
            return json.loads(data)
        if format == "csv":
            return csv.read_csv(BytesIO(data))

    def handle_output(self, context: OutputContext, obj: Any) -> None:
        return super().handle_output(context, obj)


@io_manager(config_schema={"root_url": StringSource})
def object_store_io(context: InitResourceContext) -> ObjectStoreIoManager:
    return ObjectStoreIoManager(context.resource_config["root_url"])

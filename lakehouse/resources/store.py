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

from .config import storage_config


class ObjectStoreIoManager(IOManager):
    def __init__(self, location: str, storage_options: Optional[dict[str, str]] = None) -> None:
        self._store = ObjectStore(location, options=storage_options)

    def load_input(self, context: InputContext) -> Any:
        return super().load_input(context)

    def handle_output(self, context: OutputContext, obj: Any) -> None:
        return super().handle_output(context, obj)


@io_manager(config_schema={"root_url": StringSource, "storage_options": storage_config})
def object_store_io(context: InitResourceContext) -> ObjectStoreIoManager:
    """IO manager backed by generic object store implementation

    The object store supports supports azure, gcp, and s3 compliant stores (e.g. AWS).
    The specific backend is chosen based on the provided url:

    Azure:
    - az://<container>/<path>

    S3:
    - s3://<bucket>/<path>

    Gcp:
    - gs://<bucket>/<path>

    Depending on the backend, different configuration keys are honored.
    - azure: https://docs.rs/object_store/latest/object_store/azure/enum.AzureConfigKey.html#variants
    - s3: https://docs.rs/object_store/latest/object_store/aws/enum.AmazonS3ConfigKey.html#variants
    - gcp: https://docs.rs/object_store/latest/object_store/gcp/enum.GoogleConfigKey.html#variants

    Args:
        context (InitResourceContext): _description_

    Returns:
        ObjectStoreIoManager: IO manager resource definition
    """
    return ObjectStoreIoManager(context.resource_config.root_url, context.resource_config.storage_options)

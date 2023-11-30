import subprocess
from pathlib import Path

from dagster_deltalake import DeltaTableResource, LocalConfig
from dagster_deltalake_pandas import DeltaLakePandasIOManager

from .store import object_store_io as object_store_io


def find_git_root() -> Path:
    try:
        args = ["git", "rev-parse", "--show-toplevel"]
        output = subprocess.check_output(args)  # nosec
    except subprocess.CalledProcessError:
        return Path.cwd()

    return Path(output.strip(b"\n").decode())


resources = {
    "delta_io_manager": DeltaLakePandasIOManager(
        root_uri="./.data",
        storage_options=LocalConfig(),
    ),
    "object_store_io_manager": object_store_io.configured(
        {"root_url": str(find_git_root() / "data")}
    ),
    "arrow_cleaned": DeltaTableResource(
        url="./.data/taxi/yellow_cab_trips_cleaned_arrow", storage_options=LocalConfig()
    ),
}

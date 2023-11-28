import subprocess
from pathlib import Path

from dagster_deltalake import LocalConfig
from dagster_deltalake_pandas import DeltaLakePandasIOManager

from .hn_resource import HNAPISubsampleClient
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
    "hn_client": HNAPISubsampleClient(subsample_rate=10),
}

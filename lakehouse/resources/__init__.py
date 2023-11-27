import subprocess
from pathlib import Path

from .delta import DeltaIoManager as DeltaIoManager
from .delta import delta_io as delta_io
from .store import object_store_io as object_store_io


def find_git_root() -> Path:
    try:
        args = ["git", "rev-parse", "--show-toplevel"]
        output = subprocess.check_output(args)  # nosec
    except subprocess.CalledProcessError:
        return Path.cwd()

    return Path(output.strip(b"\n").decode())


product_store = {
    "local": object_store_io.configured({"root_url": str(find_git_root() / "data")}),
    "test": object_store_io.configured({"root_url": {"env": "TEST_STORE_LOCATION"}}),
    "development": object_store_io.configured({"root_url": "az://testdata"}),
    "production": object_store_io.configured({"root_url": "az://data"}),
}

from collections.abc import Iterable, Sequence
from typing import Any, Callable

from .lib import Array as Array
from .lib import DataType as DataType
from .lib import Field as Field
from .lib import RecordBatch as RecordBatch
from .lib import RecordBatchReader as RecordBatchReader
from .lib import Schema as Schema
from .lib import Table as Table
from .lib import field as field

schema: Any
map_: Any
list_: Any
struct: Any
type_for_alias: Any
date32: Any
date64: Any
decimal128: Any
float16: Any
float32: Any
float64: Any

py_buffer: Callable[[bytes], Any]
NativeFile: Any
BufferReader: Any

# datatype functions

def _datatype_fn(name: str = "") -> DataType: ...

int8 = _datatype_fn
int16 = _datatype_fn
int32 = _datatype_fn
int64 = _datatype_fn
string = _datatype_fn
timestamp = _datatype_fn

# array functions

def array(data: Sequence[Any], type: DataType | None = None) -> Array: ...
def nulls(size: int, data_type: DataType | None = None, memory_pool=None) -> Array: ...

# table functions

def concat_tables(tables: Iterable[Table], promote: bool = False, memory_pool=None) -> Table: ...
def concat_arrays(arrays: Iterable[Array], memory_pool=None) -> Array: ...

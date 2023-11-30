from .lib import Array, DataType, Int8Scalar, Int16Scalar, Int32Scalar, Int64Scalar

ArrayLike = Array | list

IntScalar = Int8Scalar | Int16Scalar | Int32Scalar | Int64Scalar

def unique(array: Array, *, memory_pool=None) -> Array:
    """Compute unique elements.

    Return an array with distinct values. Nulls in the input are ignored."""

def index(
    data: ArrayLike,
    value,
    start: int | None = None,
    end: int | None = None,
    *,
    memory_pool=None,
) -> IntScalar:
    """Find the index of the first occurrence of a given value."""

def cast(
    arr: ArrayLike,
    target_type: DataType | str | None = None,
    safe: bool = True,
    options=None,
) -> Array:
    """Cast array values to another data type. Can also be invoked as an array instance method."""

def min(
    array: ArrayLike, *, skip_nulls: bool = True, min_count: int = 1, memory_pool=None
) -> Array:
    """Compute the minimum or maximum values of a numeric array.

    Null values are ignored by default. This can be changed through ScalarAggregateOptions."""

def max(
    array: ArrayLike, *, skip_nulls: bool = True, min_count: int = 1, memory_pool=None
) -> Array:
    """Compute the minimum or maximum values of a numeric array.

    Null values are ignored by default. This can be changed through ScalarAggregateOptions."""

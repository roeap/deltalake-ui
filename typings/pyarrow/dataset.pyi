from collections.abc import Iterable
from typing import Any

from .lib import RecordBatch, RecordBatchReader, Schema, Table

Dataset: Any
dataset: Any
partitioning: Any
FileSystemDataset: Any
ParquetFileFormat: Any
ParquetReadOptions: Any
ParquetFileWriteOptions: Any
write_dataset: Any

class Scanner:
    @property
    def count_rows(self):
        """Count rows matching the scanner filter."""
        ...
    @property
    def dataset_schema(self) -> Schema:
        """The schema with which batches will be read from fragments."""
        ...
    @property
    def projected_schema(self) -> Schema:
        """The materialized schema of the data, accounting for projections."""
        ...
    def to_batches(self) -> Iterable[RecordBatch]:
        """Consume a Scanner in record batches."""
        ...
    def to_reader(self) -> RecordBatchReader:
        """Consume this scanner as a RecordBatchReader."""
        ...
    def to_table(self) -> Table:
        """Convert a Scanner into a Table."""
        ...

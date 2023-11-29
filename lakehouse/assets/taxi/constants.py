from dagster import MonthlyPartitionsDefinition

ASSET_PREFIX = ["taxi"]
DATA_PARTITION = MonthlyPartitionsDefinition(start_date="2015-01-01", end_offset=-1)

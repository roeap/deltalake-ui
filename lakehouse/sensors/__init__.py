from dagster import RunRequest, SensorEvaluationContext, job, op, sensor
from dagster_deltalake import DeltaTableResource


@op
def optimize_arrow_cleaned_op(arrow_cleaned: DeltaTableResource):
    dt = arrow_cleaned.load()
    dt.optimize.z_order(columns=["pickup_day", "pickup_hour"])


@job
def optimize_arrow_cleaned():
    optimize_arrow_cleaned_op()


@sensor(job=optimize_arrow_cleaned)
def optimize_sensor(
    context: SensorEvaluationContext, arrow_cleaned: DeltaTableResource
):
    last_version = int(context.cursor) if context.cursor else 0

    table = arrow_cleaned.load()
    current_version = table.version()

    if current_version > last_version + 1:
        yield RunRequest(run_key=f"arrow_cleaned-{table.version()}", run_config={})

    context.update_cursor(str(current_version))

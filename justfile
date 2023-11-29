generate-sharing-types:
    npx openapi-typescript http://localhost:8080/api-doc/openapi.json --output src/clients/delta-sharing/types.ts

generate:
    npx openapi-typescript openapi.json --output app/src/clients/delta-sharing/types.ts

compose:
    docker compose -f compose.yaml -p deltalake up -d

dev:
    npm run dev --workspace=deltalake-ui

data:
    DAGSTER_HOME="{{ justfile_directory() }}/.dagster" poetry run dagster dev -m lakehouse

profile case:
    poetry run python -m memray run -o output.bin scripts/profile.py {{ case }}
    poetry run python -m memray flamegraph --force -o scripts/profiles/{{ case }}.html output.bin
    rm output.bin

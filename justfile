generate-sharing-types:
    npx openapi-typescript http://localhost:8080/api-doc/openapi.json --output src/clients/delta-sharing/types.ts

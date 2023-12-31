/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/admin/accounts": {
    get: operations["ListAccounts"];
    post: operations["CreateAccount"];
  };
  "/admin/accounts/{account}": {
    get: operations["GetAccount"];
  };
  "/admin/login": {
    post: operations["login"];
  };
  "/admin/profile": {
    get: operations["profile"];
  };
  "/admin/shares": {
    post: operations["CreateShare"];
  };
  "/admin/shares/{share}/schemas": {
    post: operations["CreateSchema"];
  };
  "/admin/shares/{share}/schemas/{schema}/tables": {
    post: operations["CreateTable"];
  };
  "/shares": {
    get: operations["ListShares"];
  };
  "/shares/{share}": {
    get: operations["GetShare"];
  };
  "/shares/{share}/all-tables": {
    get: operations["ListALLTables"];
  };
  "/shares/{share}/schemas": {
    get: operations["ListSchemas"];
  };
  "/shares/{share}/schemas/{schema}/tables": {
    get: operations["ListTables"];
  };
  "/shares/{share}/schemas/{schema}/tables/{table}/metadata": {
    get: operations["GetTableMetadata"];
  };
  "/shares/{share}/schemas/{schema}/tables/{table}/query": {
    post: operations["QueryTable"];
  };
  "/shares/{share}/schemas/{schema}/tables/{table}/version": {
    get: operations["GetTableVersion"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Account: {
      email: string;
      name: string;
      namespace: string;
      /** Format: int64 */
      ttl: number;
    };
    AdminAccountsGetResponse: {
      account: components["schemas"]["Account"];
    };
    AdminAccountsListResponse: {
      items: components["schemas"]["Account"][];
      nextPageToken?: string | null;
    };
    AdminAccountsPostRequest: {
      email: string;
      id?: string | null;
      name: string;
      namespace: string;
      password: string;
      /** Format: int64 */
      ttl: number;
    };
    AdminAccountsPostResponse: {
      account: components["schemas"]["Account"];
    };
    AdminLoginRequest: {
      account: string;
      password: string;
    };
    AdminLoginResponse: {
      profile: components["schemas"]["Profile"];
    };
    AdminProfileResponse: {
      profile: components["schemas"]["Profile"];
    };
    AdminSharesPostRequest: {
      name: string;
    };
    AdminSharesPostResponse: {
      share: components["schemas"]["Share"];
    };
    AdminSharesSchemasPostRequest: {
      name: string;
    };
    AdminSharesSchemasPostResponse: {
      schema: components["schemas"]["Schema"];
    };
    AdminSharesSchemasTablesPostRequest: {
      location: string;
      name: string;
    };
    AdminSharesSchemasTablesPostResponse: {
      table: components["schemas"]["Table"];
    };
    ErrorMessage: {
      errorCode: string;
      message: string;
    };
    /** @enum {string} */
    OpType:
      | "column"
      | "literal"
      | "isNull"
      | "equal"
      | "lessThan"
      | "lessThanOrEqual"
      | "greaterThan"
      | "greaterThanOrEqual"
      | "and"
      | "or"
      | "not";
    PredicateJson: {
      children?: components["schemas"]["PredicateJson"][] | null;
      name?: string | null;
      op: components["schemas"]["OpType"];
      value?: string | null;
      valueType?: components["schemas"]["ValueType"] | null;
    };
    Profile: {
      bearerToken: string;
      endpoint: string;
      expirationTime: string;
      /** Format: int32 */
      shareCredentialsVersion: number;
    };
    Schema: {
      id: string;
      name: string;
    };
    SchemaDetail: {
      name: string;
      share: string;
    };
    Share: {
      id: string;
      name: string;
    };
    SharesAllTablesListResponse: {
      items: components["schemas"]["TableDetail"][];
      nextPageToken?: string | null;
    };
    SharesGetResponse: {
      share: components["schemas"]["Share"];
    };
    SharesListResponse: {
      items: components["schemas"]["Share"][];
      nextPageToken?: string | null;
    };
    SharesSchemasListResponse: {
      items: components["schemas"]["SchemaDetail"][];
      nextPageToken?: string | null;
    };
    SharesSchemasTablesListResponse: {
      items: components["schemas"]["TableDetail"][];
      nextPageToken?: string | null;
    };
    SharesSchemasTablesQueryPostRequest: {
      jsonPredicateHints?: components["schemas"]["PredicateJson"] | null;
      /** Format: int32 */
      limitHint?: number | null;
      predicateHints?: string[] | null;
      timestamp?: string | null;
      /** Format: int64 */
      version?: number | null;
    };
    Table: {
      id: string;
      location: string;
      name: string;
    };
    TableDetail: {
      name: string;
      schema: string;
      share: string;
    };
    /** @enum {string} */
    ValueType: "boolean" | "int" | "long" | "string" | "date";
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  ListAccounts: {
    parameters: {
      query?: {
        maxResults?: number | null;
        pageToken?: string | null;
      };
    };
    responses: {
      /** @description The accounts were successfully returned. */
      200: {
        content: {
          "application/json": components["schemas"]["AdminAccountsListResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  CreateAccount: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AdminAccountsPostRequest"];
      };
    };
    responses: {
      /** @description The account was successfully registered. */
      201: {
        content: {
          "application/json": components["schemas"]["AdminAccountsPostResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The account was already registered. */
      409: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  GetAccount: {
    parameters: {
      path: {
        account: string;
      };
    };
    responses: {
      /** @description The account's metadata was successfully returned. */
      200: {
        content: {
          "application/json": components["schemas"]["AdminAccountsGetResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The requested resource does not exist. */
      404: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  login: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AdminLoginRequest"];
      };
    };
    responses: {
      /** @description The profile was successfully returned. */
      200: {
        content: {
          "application/json": components["schemas"]["AdminLoginResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  profile: {
    responses: {
      /** @description The profile were successfully returned. */
      200: {
        content: {
          "application/json": components["schemas"]["AdminProfileResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  CreateShare: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AdminSharesPostRequest"];
      };
    };
    responses: {
      /** @description The share was successfully registered. */
      201: {
        content: {
          "application/json": components["schemas"]["AdminSharesPostResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The share was already registered. */
      409: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  CreateSchema: {
    parameters: {
      path: {
        share: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AdminSharesSchemasPostRequest"];
      };
    };
    responses: {
      /** @description The schema was successfully registered. */
      201: {
        content: {
          "application/json": components["schemas"]["AdminSharesSchemasPostResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The schema was already registered. */
      409: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  CreateTable: {
    parameters: {
      path: {
        share: string;
        schema: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AdminSharesSchemasTablesPostRequest"];
      };
    };
    responses: {
      /** @description The schema was successfully registered. */
      201: {
        content: {
          "application/json": components["schemas"]["AdminSharesSchemasTablesPostResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The schema was already registered. */
      409: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  ListShares: {
    parameters: {
      query?: {
        maxResults?: number | null;
        pageToken?: string | null;
      };
    };
    responses: {
      /** @description The shares were successfully returned. */
      200: {
        content: {
          "application/json": components["schemas"]["SharesListResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  GetShare: {
    parameters: {
      path: {
        share: string;
      };
    };
    responses: {
      /** @description The share's metadata was successfully returned. */
      200: {
        content: {
          "application/json": components["schemas"]["SharesGetResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The requested resource does not exist. */
      404: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  ListALLTables: {
    parameters: {
      query?: {
        maxResults?: number | null;
        pageToken?: string | null;
      };
      path: {
        share: string;
      };
    };
    responses: {
      /** @description The tables were successfully returned. */
      200: {
        content: {
          "application/json": components["schemas"]["SharesAllTablesListResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The requested resource does not exist. */
      404: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  ListSchemas: {
    parameters: {
      query?: {
        maxResults?: number | null;
        pageToken?: string | null;
      };
      path: {
        share: string;
      };
    };
    responses: {
      /** @description The schemas were successfully returned. */
      200: {
        content: {
          "application/json": components["schemas"]["SharesSchemasListResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The requested resource does not exist. */
      404: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  ListTables: {
    parameters: {
      query?: {
        maxResults?: number | null;
        pageToken?: string | null;
      };
      path: {
        share: string;
        schema: string;
      };
    };
    responses: {
      /** @description The tables were successfully returned. */
      200: {
        content: {
          "application/json": components["schemas"]["SharesSchemasTablesListResponse"];
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The requested resource does not exist. */
      404: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  GetTableMetadata: {
    parameters: {
      path: {
        share: string;
        schema: string;
        table: string;
      };
    };
    responses: {
      /** @description The table metadata was successfully returned. */
      200: {
        content: {
          "text/plain": string;
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The requested resource does not exist. */
      404: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  QueryTable: {
    parameters: {
      path: {
        share: string;
        schema: string;
        table: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SharesSchemasTablesQueryPostRequest"];
      };
    };
    responses: {
      /** @description The tables were successfully returned. */
      200: {
        content: {
          "text/plain": string;
        };
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The requested resource does not exist. */
      404: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
  GetTableVersion: {
    parameters: {
      path: {
        share: string;
        schema: string;
        table: string;
      };
    };
    responses: {
      /** @description The table version was successfully returned. */
      200: {
        content: never;
      };
      /** @description The request is malformed. */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is unauthenticated. The bearer token is missing or incorrect. */
      401: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is forbidden from being fulfilled. */
      403: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The requested resource does not exist. */
      404: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
      /** @description The request is not handled correctly due to a server error. */
      500: {
        content: {
          "application/json": components["schemas"]["ErrorMessage"];
        };
      };
    };
  };
}

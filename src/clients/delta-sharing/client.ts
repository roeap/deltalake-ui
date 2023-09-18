import createClient from "openapi-fetch";
import { paths, components } from "./types";

type LoginParams = components["schemas"]["AdminLoginRequest"];
type LoginOptions = {
  signal?: AbortSignal;
};

type ListSharesRequestParams = paths["/shares"]["get"]["parameters"];

type ListAccountsRequestParams = paths["/admin/accounts"]["get"]["parameters"];

type ListAccountsOptions = {
  signal?: AbortSignal;
  token: string;
};

type RequestOptions = {
  signal?: AbortSignal;
  token: string;
};

export class DeltaSharingClient {
  private readonly client;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.client = createClient<paths>({ baseUrl });
  }

  async login(params: LoginParams, options?: LoginOptions) {
    const { data, error } = await this.client.POST("/admin/login", {
      body: params,
      ...(options || {}),
    });
    if (data) return data;
    throw new Error(error.message);
  }

  async listShares(params: ListSharesRequestParams, options?: RequestOptions) {
    const { token, ...other } = options || {};
    const { data, error } = await this.client.GET("/shares", {
      params,
      headers: token ? { authorization: `Bearer ${token}` } : {},
      ...(other || {}),
    });
    if (data) return data;
    throw new Error(error.message);
  }

  async createShare(
    params: components["schemas"]["AdminSharesPostRequest"],
    options?: RequestOptions
  ) {
    const { token, ...other } = options || {};
    const { data, error } = await this.client.POST("/admin/shares", {
      body: params,
      headers: token ? { authorization: `Bearer ${token}` } : {},
      ...(other || {}),
    });
    if (data) return data;
    throw new Error(error.message);
  }

  async listSchemas(share: string, options?: RequestOptions) {
    const { token, ...other } = options || {};
    const { data, error } = await this.client.GET("/shares/{share}/schemas", {
      params: { path: { share } },
      headers: token ? { authorization: `Bearer ${token}` } : {},
      ...(other || {}),
    });
    if (data) return data;
    throw new Error(error.message);
  }

  async createSchema(
    share: string,
    params: components["schemas"]["AdminSharesSchemasPostRequest"],
    options?: RequestOptions
  ) {
    const { token, ...other } = options || {};
    const { data, error } = await this.client.POST(
      "/admin/shares/{share}/schemas",
      {
        body: params,
        params: { path: { share } },
        headers: token ? { authorization: `Bearer ${token}` } : {},
        ...(other || {}),
      }
    );
    if (data) return data;
    throw new Error(error.message);
  }

  async listTables(share: string, schema: string, options?: RequestOptions) {
    const { token, ...other } = options || {};
    const { data, error } = await this.client.GET(
      "/shares/{share}/schemas/{schema}/tables",
      {
        params: { path: { share, schema } },
        headers: token ? { authorization: `Bearer ${token}` } : {},
        ...(other || {}),
      }
    );
    if (data) return data;
    throw new Error(error.message);
  }

  async createTable(
    share: string,
    schema: string,
    params: components["schemas"]["AdminSharesSchemasTablesPostRequest"],
    options?: RequestOptions
  ) {
    const { token, ...other } = options || {};
    const { data, error } = await this.client.POST(
      "/admin/shares/{share}/schemas/{schema}/tables",
      {
        body: params,
        params: { path: { share, schema } },
        headers: token ? { authorization: `Bearer ${token}` } : {},
        ...(other || {}),
      }
    );
    if (data) return data;
    throw new Error(error.message);
  }

  async listAccounts(
    params: ListAccountsRequestParams,
    options?: ListAccountsOptions
  ) {
    const { data, error } = await this.client.GET("/admin/accounts", {
      params,
      ...(options || {}),
    });
    if (data) return data;
    throw new Error(error.message);
  }
}

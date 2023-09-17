import createClient from "openapi-fetch";
import { paths, components } from "./types";

type LoginParams = components["schemas"]["AdminLoginRequest"];
type LoginOptions = {
  signal?: AbortSignal;
};

type ListSharesRequestParams = paths["/shares"]["get"]["parameters"];

type CreateShareParams = components["schemas"]["AdminSharesPostRequest"];

type ListAccountsRequestParams = paths["/admin/accounts"]["get"]["parameters"];

type ListAccountsOptions = {
  signal?: AbortSignal;
  token: string;
};

type RequestOptions = {
  signal?: AbortSignal;
  token: string;
};

type CreateAccountRequestParams = paths["/admin/accounts"]["post"];

export type Share = {
  id: string;
  name: string;
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

  async createShare(params: CreateShareParams, options?: RequestOptions) {
    const { token, ...other } = options || {};
    const { data, error } = await this.client.POST("/admin/shares", {
      // @ts-ignore
      body: params,
      headers: token ? { authorization: `Bearer ${token}` } : {},
      ...(other || {}),
    });
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

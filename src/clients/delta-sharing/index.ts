import createClient from "openapi-fetch";
import { paths } from "./types";

type LoginRequestParams =
  paths["/admin/login"]["post"]["requestBody"]["content"]["application/json"];

type LoginrequestOptions = {
  signal?: AbortSignal;
};

export class DeltaSharingClient {
  private readonly client;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.client = createClient<paths>({ baseUrl });
  }

  async login(params: LoginRequestParams, options?: LoginrequestOptions) {
    const { data, error } = await this.client.POST("/admin/login", {
      body: params,
      ...(options || {}),
    });
    if (data) return data;
    throw new Error(error.message);
  }
}

import { tableFromIPC, Table } from "apache-arrow";
import { createPromiseClient, PromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { QueryService } from "../../gen/lakehouse/data/v1alpha1/api_connect";
import { QueryRequest } from "@/gen/lakehouse/data/v1alpha1/api_pb";

const transport = createConnectTransport({
  baseUrl: "http://localhost:3000/api",
});

export class LakehouseClient {
  private readonly client: PromiseClient<typeof QueryService>;

  constructor() {
    this.client = createPromiseClient(QueryService, transport);
  }

  async query(query: string): Promise<Table> {
    const result = await this.client.query(new QueryRequest({ query }));
    return tableFromIPC(result.data);
  }
}

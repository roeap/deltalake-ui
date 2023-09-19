import {
  createFlightSqlClient,
  ClientArgs,
  FlightSqlClient,
} from "@lakehouse-rs/flight-sql-client";
import { tableFromIPC, Table } from "apache-arrow";

export class LakehouseClient {
  constructor(private readonly client: FlightSqlClient) {}

  static async fromOptions(options: ClientArgs): Promise<LakehouseClient> {
    const client = await createFlightSqlClient(options);
    return new LakehouseClient(client);
  }

  async query(query: string): Promise<Table> {
    const result = await this.client.query(query);
    return tableFromIPC(result);
  }
}

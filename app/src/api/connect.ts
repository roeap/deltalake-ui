import { ConnectRouter, ConnectError, Code } from "@connectrpc/connect";
import {
  type QueryRequest,
  QueryService,
  type ListSharingServersRequest,
  type GetSharingServerRequest,
  type GetTablesRequest,
} from "@/gen";
import {
  ClientOptions,
  createFlightSqlClient,
  FlightSqlClient,
} from "@lakehouse-rs/flight-sql-client";

const options: ClientOptions = {
  username: "flight_username",
  password: "testing123",
  tls: false,
  host: "127.0.0.1",
  port: 50051,
  headers: [],
};

let client: FlightSqlClient | undefined = undefined;

async function getFlightSqlClient(
  options: ClientOptions
): Promise<FlightSqlClient> {
  if (!client) {
    client = await createFlightSqlClient(options);
  }
  return client;
}

export const connectRouter = (router: ConnectRouter) =>
  router.service(QueryService, {
    query,
    getTables,
    listSharingServers,
    getSharingServer,
  });

async function query(req: QueryRequest) {
  client = await getFlightSqlClient(options);
  const data = await client.query(req.query);
  return { data };
}

async function getTables(req: GetTablesRequest) {
  client = await getFlightSqlClient(options);
  const data = await client.getTables(req);
  return { data };
}

const servers = [
  {
    id: "1",
    name: "Production data",
    description: "Awesome data to share",
    url: "http://localhost:8080",
  },
  {
    id: "2",
    name: "Business data",
    description: "Awesome data to share",
    url: "http://localhost:8080",
  },
];

async function listSharingServers(req: ListSharingServersRequest) {
  return { servers };
}

async function getSharingServer(req: GetSharingServerRequest) {
  const server = servers.find((s) => s.id === req.id);
  if (server === undefined) {
    throw new ConnectError(`Server '${req.id}' not registered.`, Code.NotFound);
  }
  return { server };
}

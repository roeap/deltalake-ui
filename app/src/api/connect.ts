import { ConnectRouter } from "@connectrpc/connect";
import {
  type QueryRequest,
  QueryService,
  type ListSharingServersRequest,
} from "@/gen";
import {
  ClientArgs,
  createFlightSqlClient,
  FlightSqlClient,
} from "@lakehouse-rs/flight-sql-client";

const options: ClientArgs = {
  username: "flight_username",
  password: "testing123",
  tls: false,
  host: "127.0.0.1",
  port: 50051,
  headers: [],
};

let client: FlightSqlClient | undefined = undefined;

async function getFlightSqlClient(
  options: ClientArgs
): Promise<FlightSqlClient> {
  if (!client) {
    client = await createFlightSqlClient(options);
  }
  return client;
}

export const connectRouter = (router: ConnectRouter) =>
  router.service(QueryService, {
    query,
    listSharingServers,
  });

async function query(req: QueryRequest) {
  client = await getFlightSqlClient(options);
  const data = await client.query(req.query);
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

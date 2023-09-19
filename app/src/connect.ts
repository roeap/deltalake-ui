import { ConnectRouter } from "@connectrpc/connect";
import { ElizaService } from "./gen/connectrpc/eliza/v1/eliza_connect";
import type {
  SayRequest,
  IntroduceRequest,
  ConverseRequest,
} from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import { LakehouseClient } from "@/clients";
import { ClientArgs } from "@lakehouse-rs/flight-sql-client";

const options: ClientArgs = {
  username: "flight_username",
  password: "testing123",
  tls: false,
  host: "127.0.0.1",
  port: 50051,
  headers: [],
};
let client = undefined;

const connectRouter = (router: ConnectRouter) =>
  router.service(ElizaService, {
    async say(req: SayRequest) {
      client = await LakehouseClient.fromOptions(options);
      const table = await client.query("SELECT * FROM delta.test.simple_table");
      return {
        sentence: `You said ${table.toArray()}`,
      };
    },

    async *introduce(req: IntroduceRequest) {
      yield { sentence: `Hi ${req.name}, I'm Eliza` };
      await delay(250);
      yield {
        sentence: `Before we begin, ${req.name}, let me tell you something about myself.`,
      };
      await delay(250);
      yield { sentence: `I'm a Rogerian psychotherapist.` };
      await delay(250);
      yield { sentence: `How are you feeling today?` };
    },

    async *converse(reqs: AsyncIterable<ConverseRequest>) {
      for await (const req of reqs) {
        yield {
          sentence: `You said ${req.sentence}`,
        };
      }
    },
  });

export default connectRouter;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

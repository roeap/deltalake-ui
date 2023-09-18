import { ConnectRouter } from "@connectrpc/connect";
import { ElizaService } from "./gen/connectrpc/eliza/v1/eliza_connect";
import type {
  SayRequest,
  IntroduceRequest,
  ConverseRequest,
} from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import * as flight from "flight-client";

const connectRouter = (router: ConnectRouter) =>
  router.service(ElizaService, {
    say(req: SayRequest) {
      return {
        sentence: `You said ${flight.hello()}`,
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

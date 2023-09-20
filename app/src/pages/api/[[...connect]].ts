import { nextJsApiRouter } from "@connectrpc/connect-next";
import { connectRouter } from "@/api";

const { handler, config } = nextJsApiRouter({ routes: connectRouter });
export { handler as default, config };

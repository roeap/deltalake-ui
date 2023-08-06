import { Params, RequestBody } from "openapi-fetch";

/**
 * openapi-fetch wrapper
 */
export type UseQueryOptions<T> = Params<T> &
  RequestBody<T> & {
    // add your custom options here
    reactQuery: {
      enabled: boolean;
      // add other React Query options as needed
    };
  };

// @generated by protoc-gen-es v1.3.1 with parameter "target=ts"
// @generated from file lakehouse/data/v1alpha1/api.proto (package lakehouse.data.v1alpha1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message lakehouse.data.v1alpha1.QueryRequest
 */
export class QueryRequest extends Message<QueryRequest> {
  /**
   * @generated from field: string query = 1;
   */
  query = "";

  constructor(data?: PartialMessage<QueryRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "lakehouse.data.v1alpha1.QueryRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "query", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): QueryRequest {
    return new QueryRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): QueryRequest {
    return new QueryRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): QueryRequest {
    return new QueryRequest().fromJsonString(jsonString, options);
  }

  static equals(a: QueryRequest | PlainMessage<QueryRequest> | undefined, b: QueryRequest | PlainMessage<QueryRequest> | undefined): boolean {
    return proto3.util.equals(QueryRequest, a, b);
  }
}

/**
 * @generated from message lakehouse.data.v1alpha1.QueryResponse
 */
export class QueryResponse extends Message<QueryResponse> {
  /**
   * @generated from field: bytes data = 1;
   */
  data = new Uint8Array(0);

  constructor(data?: PartialMessage<QueryResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "lakehouse.data.v1alpha1.QueryResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): QueryResponse {
    return new QueryResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): QueryResponse {
    return new QueryResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): QueryResponse {
    return new QueryResponse().fromJsonString(jsonString, options);
  }

  static equals(a: QueryResponse | PlainMessage<QueryResponse> | undefined, b: QueryResponse | PlainMessage<QueryResponse> | undefined): boolean {
    return proto3.util.equals(QueryResponse, a, b);
  }
}

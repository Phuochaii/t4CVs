import { JSONType } from "@eventstore/db-client";

export type EventStoreEvent<TData extends JSONType = {}> = {
  data: TData;
  type: string;
};
export type EventStorePublishedEvent = EventStoreEvent & { revision: bigint };

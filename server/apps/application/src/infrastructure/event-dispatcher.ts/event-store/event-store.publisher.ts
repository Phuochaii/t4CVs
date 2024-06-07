import { IEventPublisher } from '@nestjs/cqrs';
import { EventStoreDBClient, jsonEvent, JSONType } from '@eventstore/db-client';
import { Inject } from '@nestjs/common';
import { EventStoreEvent } from './event-store.type';

class EventStorePublisher implements IEventPublisher {
  constructor(
    @Inject('EVENT_STORE')
    private readonly eventStore: EventStoreDBClient,
    @Inject('EVENT_STREAM')
    private readonly eventStream: string,
  ) {}

  async publish<TEvent>(event: TEvent): Promise<any> {
    const parsedEvent = jsonEvent({
      type: event.constructor.name,
      data: event,
    } as EventStoreEvent);

    await this.eventStore.appendToStream(this.eventStream, [parsedEvent]);
  }
}

export default EventStorePublisher;

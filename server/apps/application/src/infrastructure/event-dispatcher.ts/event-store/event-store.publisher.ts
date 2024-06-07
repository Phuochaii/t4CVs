import { EventStoreDBClient, jsonEvent } from '@eventstore/db-client';
import { Inject } from '@nestjs/common';
import { EventStoreEvent } from './event-store.type';
import { IEvent } from '@app/common/domain';
import {
  EventPublisherOrchestrator,
  IOrchestratableEventPublisher,
} from '@app/common/multi-event-publisher';

class EventStorePublisher implements IOrchestratableEventPublisher {
  constructor(
    @Inject('EVENT_STORE')
    private readonly eventStore: EventStoreDBClient,
    @Inject('EVENT_STREAM')
    private readonly eventStream: string,
    @Inject('EVENTS')
    private readonly RegisteredEvents: (new (...args: any[]) => IEvent)[],
    eventPublisherOrchestrator: EventPublisherOrchestrator,
  ) {
    eventPublisherOrchestrator.register(this);
  }

  canHandle(event: any): boolean {
    const canHandle = this.RegisteredEvents.some(
      (RegisteredEvent) => event instanceof RegisteredEvent,
    );
    return canHandle;
  }

  async publish<TEvent>(event: TEvent): Promise<any> {
    const parsedEvent = jsonEvent({
      type: event.constructor.name,
      data: event,
    } as EventStoreEvent);

    await this.eventStore.appendToStream(this.eventStream, [parsedEvent]);
  }
}

export default EventStorePublisher;

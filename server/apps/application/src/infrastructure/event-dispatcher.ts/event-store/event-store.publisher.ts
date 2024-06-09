import { EventStoreDBClient, jsonEvent } from '@eventstore/db-client';
import { Inject } from '@nestjs/common';
import { EventStoreEvent } from './event-store.type';
import { IEvent } from '@app/common/domain';
import {
  EventPublisherOrchestrator,
  IOrchestratableEventPublisher,
} from '@app/common/multi-event-publisher';
import { EventStoreService } from './event-store.service';

class EventStorePublisher implements IOrchestratableEventPublisher {
  constructor(
    @Inject('EVENT_STREAM')
    private readonly eventStream: string,
    @Inject('EVENTS')
    private readonly RegisteredEvents: (new (...args: any[]) => IEvent)[],
    eventPublisherOrchestrator: EventPublisherOrchestrator,
    private readonly eventStoreService: EventStoreService
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
    this.eventStoreService.appendToStream(this.eventStream, [event]);
  }
}

export default EventStorePublisher;

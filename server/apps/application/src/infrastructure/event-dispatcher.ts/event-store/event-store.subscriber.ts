import { IEvent, IMessageSource } from '@nestjs/cqrs';
import { Subject } from 'rxjs';
import { Inject } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';
import { plainToInstance } from 'class-transformer';

class EventStoreSubscriber implements IMessageSource {
  private bridge: Subject<any>;

  constructor(
    @Inject('EVENT_STORE')
    private readonly eventStore: EventStoreDBClient,
    @Inject('EVENTS') private readonly registeredEvents: Array<any>,
    @Inject('EVENT_STREAM') private readonly eventStream: string,
  ) {}

  async connect(): Promise<void> {
    const userSubscription = this.eventStore.subscribeToStream(
      this.eventStream,
      {
        fromRevision: 'end',
      },
    );

    userSubscription.on('data', ({ event }) => {
      const isRegisteredEvent = this.registeredEvents.some(
        (RegisteredEvent) => RegisteredEvent.name === event.type,
      );
      if (!isRegisteredEvent) return console.log('Event not registered', event);
      const RegisteredEvent = this.registeredEvents.find(
        (RegisteredEvent) => RegisteredEvent.name === event.type,
      );
      const receivedEvent = plainToInstance(RegisteredEvent, event.data);
      this.bridge.next(receivedEvent);
    });
  }

  bridgeEventsTo<T extends IEvent>(subject: Subject<T>): any {
    this.bridge = subject;
  }
}

export default EventStoreSubscriber;

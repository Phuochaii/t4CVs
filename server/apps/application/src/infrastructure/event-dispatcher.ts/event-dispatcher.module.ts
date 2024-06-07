import { IEventDispatcher } from '@app/common/domain';
import { Module, OnModuleInit } from '@nestjs/common';
import { EventDispatcher } from './event-dispatcher.implement';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventStoreDBClient } from '@eventstore/db-client';
import EventStoreSubscriber from './event-store/event-store.subscriber';
import EventStorePublisher from './event-store/event-store.publisher';
import { Events } from './event-store/event-store.event';
import { EventPublisherOrchestrator } from '@app/common/multi-event-publisher';

@Module({
  imports: [CqrsModule, ConfigModule],
  providers: [
    {
      provide: 'EVENT_STORE',
      useFactory: async (configService: ConfigService) => {
        const client = new EventStoreDBClient(
          {
            endpoint: `${configService.get<string>('EVENTSTORE_HOST')}:${configService.get<string>('EVENTSTORE_PORT')}`,
          },
          {
            insecure: true,
          },
        );
        return client;
      },
      inject: [ConfigService],
    },
    {
      provide: 'EVENTS',
      useValue: Events,
    },
    {
      provide: 'EVENT_STREAM',
      useValue: 'topcv-user',
    },
    {
      provide: IEventDispatcher,
      useClass: EventDispatcher,
    },
    EventPublisherOrchestrator,
    EventStoreSubscriber,
    EventStorePublisher,
  ],
  exports: [IEventDispatcher],
})
export class EventDispatcherModule implements OnModuleInit{
  constructor(
    private readonly eventBus$: EventBus,
    private readonly eventStoreSubscriber: EventStoreSubscriber,
    private readonly eventPublisherOrchestrator: EventPublisherOrchestrator,
  ) {}

  async onModuleInit(): Promise<any> {
    this.eventStoreSubscriber.connect();
    this.eventStoreSubscriber.bridgeEventsTo(this.eventBus$.subject$);
    this.eventBus$.publisher = this.eventPublisherOrchestrator;
  }
}

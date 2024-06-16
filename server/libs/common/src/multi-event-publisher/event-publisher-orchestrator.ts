import { Injectable } from '@nestjs/common';
import { IOrchestratableEventPublisher } from './orchestratable-event-publisher';
import { EventBus, IEventPublisher } from '@nestjs/cqrs';

@Injectable()
export class EventPublisherOrchestrator {
  private publishers: IOrchestratableEventPublisher[] = [];
  private defaultPublisher: IEventPublisher;

  constructor(eventBus: EventBus) {
    this.defaultPublisher = eventBus.publisher;
  }

  register(publisher: IOrchestratableEventPublisher) {
    this.publishers.push(publisher);
  }

  async publish(event: any) {
    const publisher = this.publishers.find((publisher) =>
      publisher.canHandle(event),
    );
    if (!publisher) {
      return this.defaultPublisher.publish(event);
    }
    return publisher.publish(event);
  }
}

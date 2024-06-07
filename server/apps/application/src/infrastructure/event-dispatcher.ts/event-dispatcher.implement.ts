import {
  EventType,
  IEvent,
  IEventDispatcher,
  IEventHandler,
} from '@app/common/domain';
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class EventDispatcher implements IEventDispatcher {
  constructor(private readonly eventBus: EventBus) {}
  subscribe<T extends IEvent>(
    event: EventType<T>,
    handler: IEventHandler<T>,
  ): void {
    this.eventBus.subscribe(async (event: T) => await handler.handle(event));
  }
  dispatch(event: IEvent): void {
    this.eventBus.publish(event);
  }
}

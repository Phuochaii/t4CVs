import { EventType, IEventDispatcher } from './event-dispatcher.interface';
import { IEvent } from './event.interface';

export interface IEventHandler<T extends IEvent> {
  handle(event: T): Promise<void>;
}

export abstract class BaseEventHandler<T extends IEvent>
  implements IEventHandler<T>
{
  constructor(Event: EventType<T>,dispatcher: IEventDispatcher) {
    dispatcher.subscribe(Event, this);
  }
  abstract handle(event: IEvent): Promise<void>;
}

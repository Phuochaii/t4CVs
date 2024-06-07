import { IEventHandler } from './event-handler.interface';
import { IEvent } from './event.interface';

export type EventType<T extends IEvent> = new (...args: any[]) => T;
export abstract class IEventDispatcher {
  abstract subscribe<T extends IEvent>(event: EventType<T>, handler: IEventHandler<T>): void;
  abstract dispatch(event: IEvent): void;
}

import { IEvent } from './event.interface';

export abstract class BaseEntity {
  id: number;
  private unCommitedEvents: IEvent[] = [];
  public getUnCommitedEvents() {
    return [...this.unCommitedEvents];
  }
  public markAsCommited() {
    this.unCommitedEvents = [];
  }
  abstract applyEvent(event: IEvent): Promise<void>;
  raiseEvent(event: IEvent) {
    this.applyEvent(event);
    this.unCommitedEvents.push(event);
  }
}

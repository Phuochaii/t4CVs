import {
  BACKWARDS,
  END,
  EventStoreDBClient,
  FORWARDS,
  StreamNotFoundError,
  jsonEvent,
} from '@eventstore/db-client';
import { Inject, Injectable } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { EventStoreEvent, EventStorePublishedEvent } from './event-store.type';

@Injectable()
export class EventStoreService {
  constructor(
    @Inject('EVENT_STORE')
    private readonly eventStore: EventStoreDBClient,
  ) {}

  async getLastEventFromStream(
    streamName: string,
  ): Promise<EventStorePublishedEvent | null> {
    try {
      const events = await this.eventStore
        .readStream(streamName, {
          direction: BACKWARDS,
          fromRevision: END,
          maxCount: 1,
        })
        .toArray();
      if (!events) return null;
      return events[0].event;
    } catch (error) {
      if (error instanceof StreamNotFoundError) {
        return null;
      }
      throw error;
    }
  }

  async getEventsFromRevision(
    streamName: string,
    fromRevision: number,
  ): Promise<EventStorePublishedEvent[]> {
    try {
      const events = await this.eventStore
        .readStream(streamName, {
          direction: FORWARDS,
          fromRevision: BigInt(fromRevision),
        })
        .toArray();
      return events.map((event) => event.event);
    } catch (error) {
      if (error instanceof StreamNotFoundError) {
        return [];
      }
      throw error;
    }
  }

  async appendToStream(streamName: string, events: IEvent[]): Promise<void> {
    const parsedEvents = events.map((event) =>
      jsonEvent({
        type: event.constructor.name,
        data: event,
      } as EventStoreEvent),
    );
    await this.eventStore.appendToStream(streamName, parsedEvents);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { AppState } from './snapshot.event';
import { EventStoreDBClient } from '@eventstore/db-client';
import { SnapshotService } from './snapshot.service';
import { EventStorePublishedEvent } from '../../event-dispatcher.ts/event-store';
import { ApplicationCreatedEvent } from 'apps/application/src/domain/event';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class EventStoreRepository {
  constructor(
    @Inject('EVENT_STORE')
    private readonly eventStore: EventStoreDBClient,
    @Inject('EVENT_STREAM')
    private readonly eventStream: string,
    private readonly snapshotService: SnapshotService,
  ) {}

  async getCurrentState(): Promise<AppState> {
    const snapshot = await this.snapshotService.getLatestSnapshot();
    const state: AppState = snapshot?.data.state ?? { applications: [] };

    await this.eventStore
      .readStream(this.eventStream, {
        direction: 'forwards',
        fromRevision: BigInt(snapshot ? snapshot.data.revision + 1 : 0),
      })
      .forEach(({ event }: { event: EventStorePublishedEvent }) => {
        this.applyEvent(state, event);
      })
      .catch((error) => {});

    return state;
  }

  async applyEvent(
    state: AppState,
    event: EventStorePublishedEvent,
  ): Promise<void> {
    switch (event.type) {
      case ApplicationCreatedEvent.name:
        const applicationCreatedEvent = plainToInstance(
          ApplicationCreatedEvent,
          event.data,
        );
        state.applications.push(applicationCreatedEvent.data);
        break;
      default:
        break;
    }
  }
}

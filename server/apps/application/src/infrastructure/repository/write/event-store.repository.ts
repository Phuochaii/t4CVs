import { Inject, Injectable } from '@nestjs/common';
import { AppState } from './snapshot.event';
import { EventStoreDBClient } from '@eventstore/db-client';
import { SnapshotService } from './snapshot.service';
import { EventStorePublishedEvent } from '../../event-dispatcher.ts/event-store';
import {
  ApplicationCreatedEvent,
  ApplicationUpdatedEvent,
} from 'apps/application/src/domain/event';
import { plainToInstance } from 'class-transformer';
import { Application } from 'apps/application/src/domain/entity';

@Injectable()
export class EventStoreRepository {
  constructor(
    @Inject('EVENT_STORE')
    private readonly eventStore: EventStoreDBClient,
    @Inject('EVENT_STREAM')
    private readonly eventStream: string,
    private readonly snapshotService: SnapshotService,
  ) {}

  async getCurrentState(): Promise<
    AppState & {
      revision: number;
    }
  > {
    let latestRevision: number | null = null;
    const snapshot = await this.snapshotService.getLatestSnapshot();
    latestRevision = snapshot?.data.revision ?? null;
    const applications = snapshot?.data.state.applications ?? [];
    const state: AppState = {
      applications: plainToInstance(Application, applications),
    };
    await this.eventStore
      .readStream(this.eventStream, {
        direction: 'forwards',
        fromRevision: BigInt(snapshot ? snapshot.data.revision + 1 : 0),
      })
      .forEach(({ event }: { event: EventStorePublishedEvent }) => {
        this.applyEvent(state, event);
        latestRevision = Number(event.revision);
      })
      .catch((error) => {});

    return {
      ...state,
      revision: latestRevision ?? -1,
    };
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
        state.applications.push(
          plainToInstance(Application, applicationCreatedEvent.data),
        );
        break;
      case ApplicationUpdatedEvent.name:
        const applicationUpdatedEvent = plainToInstance(
          ApplicationUpdatedEvent,
          event.data,
        );
        const application = state.applications.find(
          (application) => application.id === applicationUpdatedEvent.data.id,
        );
        if (!application) return;
        application.applyEvent(applicationUpdatedEvent);
      default:
        break;
    }
  }
}

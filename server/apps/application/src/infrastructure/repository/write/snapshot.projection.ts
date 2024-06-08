import { Inject, Injectable } from '@nestjs/common';
import { EventStoreService } from '../../event-dispatcher.ts/event-store';
import { EventStoreRepository } from './event-store.repository';
import { SnapshotService } from './snapshot.service';
import { EventStoreDBClient } from '@eventstore/db-client';
import { SnapShotEvent } from './snapshot.event';

@Injectable()
export class SnapshotProjection {
  revisionCount: number = 0;
  constructor(
    private readonly eventStoreService: EventStoreService,
    private readonly snapshotService: SnapshotService,
    private readonly eventStoreRepository: EventStoreRepository,
    @Inject('EVENT_STORE')
    eventStore: EventStoreDBClient,
    @Inject('EVENT_STREAM')
    private readonly eventStream: string,
    @Inject('EVENTS') private readonly registeredEvents: Array<any>,
  ) {
    this.initRevistionCount();
    const subscription = eventStore.subscribeToStream(eventStream, {
      fromRevision: 'end',
    });
    subscription.on('data', async ({ event }) => {
      console.log('snapshot projection event:', event.type);
      const isRegistered = this.registeredEvents.some(
        (RegisteredEvent) => RegisteredEvent.name === event.type,
      );
      if (!isRegistered) return;

      this.revisionCount++;
      if (this.revisionCount < 10) return;
      console.log('revisionCount', this.revisionCount);
      await this.updateSnapshot(Number(event.revision));
    });
  }

  async initRevistionCount(): Promise<void> {
    const latestSnapshot = await this.snapshotService.getLatestSnapshot();
    const latestEvent = await this.eventStoreService.getLastEventFromStream(
      this.eventStream,
    );
    this.revisionCount =
      Number(latestEvent?.revision ?? 0) - (latestSnapshot?.data.revision ?? 0);
  }

  async updateSnapshot(
    revision: SnapShotEvent['data']['revision'],
  ): Promise<void> {
    const state = await this.eventStoreRepository.getCurrentState();
    const snapshot = new SnapShotEvent({
      revision,
      state,
    });
    await this.snapshotService.saveSnapshot(snapshot);
    this.revisionCount = 0;
  }
}

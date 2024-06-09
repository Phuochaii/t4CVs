import { Inject, Injectable } from '@nestjs/common';
import { EventStoreRepository } from './event-store.repository';
import { SnapshotService } from './snapshot.service';
import { EventStoreDBClient } from '@eventstore/db-client';
import { SnapShotEvent } from './snapshot.event';

@Injectable()
export class SnapshotProjection {
  constructor(
    private readonly snapshotService: SnapshotService,
    private readonly eventStoreRepository: EventStoreRepository,
    @Inject('EVENT_STORE')
    eventStore: EventStoreDBClient,
    @Inject('EVENT_STREAM')
    eventStream: string,
    @Inject('EVENTS') private readonly registeredEvents: Array<any>,
  ) {
    const subscription = eventStore.subscribeToStream(eventStream, {
      fromRevision: 'end',
    });
    subscription.on('data', async ({ event }) => {
      const isRegistered = this.registeredEvents.some(
        (RegisteredEvent) => RegisteredEvent.name === event.type,
      );
      if (!isRegistered) return;

      if (Number(event.revision) % 10 !== 0) return;
      await this.updateSnapshot(Number(event.revision));
    });
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
  }
}

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
      await this.updateSnapshot();
    });
  }

  async updateSnapshot(): Promise<void> {
    const { applications, revision } =
      await this.eventStoreRepository.getCurrentState();
    const applicationsData = applications.map(
      (application) => {
        return {
          status: application.status,
          fullname: application.fullname,
          phone: application.phone,
          email: application.email,
          coverLetter: application.coverLetter,
          createdAt: application.createdAt,
          updateAt: application.updateAt,
          campaignId: application.campaignId,
          userId: application.userId,
          cvId: application.cvId,
          id: application.id,
        };
      },
    );
    const snapshot = new SnapShotEvent({
      revision,
      state: {
        applications: applicationsData,
      },
    });
    await this.snapshotService.saveSnapshot(snapshot);
  }
}

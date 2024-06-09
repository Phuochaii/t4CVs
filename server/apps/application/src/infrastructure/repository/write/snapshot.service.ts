import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EventStoreService } from '../../event-dispatcher.ts/event-store';
import { SnapShotEvent } from './snapshot.event';

@Injectable()
export class SnapshotService {
  constructor(
    private readonly eventStoreService: EventStoreService,
    @Inject('SNAPSHOT_STREAM')
    private readonly snapshotStream: string,
  ) {}

  async getLatestSnapshot(): Promise<SnapShotEvent | null> {
    const event = await this.eventStoreService.getLastEventFromStream(
      this.snapshotStream,
    );
    if (!event) return null;

    const snapshotEvent = plainToInstance(SnapShotEvent, event.data);
    return snapshotEvent;
  }

  async saveSnapshot(snapshot: SnapShotEvent): Promise<void> {
    await this.eventStoreService.appendToStream(this.snapshotStream, [
      snapshot,
    ]);
  }
}

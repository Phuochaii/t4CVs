import { Module } from '@nestjs/common';
import { SnapshotService } from './snapshot.service';
import { TypeOrmApplicationWriteRepository } from './application.write.repository';
import { EventDispatcherModule } from '../../event-dispatcher.ts/event-dispatcher.module';
import { EventStoreRepository } from './event-store.repository';
import { SnapshotProjection } from './snapshot.projection';

@Module({
  imports: [EventDispatcherModule],
  providers: [
    SnapshotService,
    EventStoreRepository,
    SnapshotProjection,
    TypeOrmApplicationWriteRepository,
    {
      provide: 'SNAPSHOT_STREAM',
      useValue: 'topcv-application-snapshot',
    },
  ],
  exports: [TypeOrmApplicationWriteRepository, EventStoreRepository],
})
export class WriteRepositoryModule {}

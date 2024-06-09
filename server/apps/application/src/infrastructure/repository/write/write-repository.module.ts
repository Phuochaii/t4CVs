import { Module } from '@nestjs/common';
import { SnapshotService } from './snapshot.service';
import { TypeOrmApplicationWriteRepository } from './application.write.repository';
import { EventDispatcherModule } from '../../event-dispatcher.ts/event-dispatcher.module';
import { EventStoreRepository } from './event-store.repository';
import { SnapshotProjection } from './snapshot.projection';
import { ApplicationWriteRepository } from 'apps/application/src/domain/repository';

@Module({
  imports: [EventDispatcherModule],
  providers: [
    SnapshotService,
    EventStoreRepository,
    SnapshotProjection,
    {
      provide: ApplicationWriteRepository,
      useClass: TypeOrmApplicationWriteRepository,
    },
    {
      provide: 'SNAPSHOT_STREAM',
      useValue: 'topcv-application-snapshot',
    },
  ],
  exports: [ApplicationWriteRepository, EventStoreRepository],
})
export class WriteRepositoryModule {}

import { Module } from '@nestjs/common';
import { ApplicationRepository } from '../../domain/repository';
import { TypeOrmApplicationRepository } from './application.repository';
import { EventDispatcherModule } from '../event-dispatcher.ts/event-dispatcher.module';;
import { WriteRepositoryModule } from './write/write-repository.module';
import { ReadRepositoryModule } from './read/read.repository.module';

@Module({
  imports: [EventDispatcherModule, ReadRepositoryModule, WriteRepositoryModule],
  providers: [
    {
      provide: ApplicationRepository,
      useClass: TypeOrmApplicationRepository,
    },
  ],
  exports: [ApplicationRepository],
})
export class RepositoryModule {}

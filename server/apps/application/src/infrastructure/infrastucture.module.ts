import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository/repository.module';
import { EventDispatcherModule } from './event-dispatcher.ts/event-dispatcher.module';

@Module({
  imports: [EventDispatcherModule, RepositoryModule],
  
  exports: [EventDispatcherModule, RepositoryModule],
})
export class InfrastructureModule {}

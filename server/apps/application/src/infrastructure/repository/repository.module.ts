import { Module, OnModuleInit } from '@nestjs/common';
import { WriteRepositoryModule } from './write/write-repository.module';
import { ReadRepositoryModule } from './read/read.repository.module';
import { DefaultDataImporter } from './import-default-data';
import { EventStoreRepository } from './write/event-store.repository';
import { EventDispatcherModule } from '../event-dispatcher.ts/event-dispatcher.module';

@Module({
  imports: [EventDispatcherModule, ReadRepositoryModule, WriteRepositoryModule],
  providers: [DefaultDataImporter],
  exports: [ReadRepositoryModule, WriteRepositoryModule],
})
export class RepositoryModule implements OnModuleInit {
  constructor(
    private readonly defaultDataImporter: DefaultDataImporter,
    private readonly eventStoreRepository: EventStoreRepository,
  ) {}
  async onModuleInit() {
    const state = await this.eventStoreRepository.getCurrentState();
    if (state.applications.length > 0) return;
    await this.defaultDataImporter.importDefaultData();
  }
}

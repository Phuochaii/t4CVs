import { Module } from '@nestjs/common';
import { WriteRepositoryModule } from './write/write-repository.module';
import { ReadRepositoryModule } from './read/read.repository.module';

@Module({
  imports: [ReadRepositoryModule, WriteRepositoryModule],
  exports: [ReadRepositoryModule, WriteRepositoryModule],
})
export class RepositoryModule {}

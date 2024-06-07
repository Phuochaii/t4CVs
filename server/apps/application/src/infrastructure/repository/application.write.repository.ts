import { Repository } from 'typeorm';
import { ApplicationWriteRepository } from '../../domain/repository';
import { ApplicationSchema } from './schema';
import { IEventDispatcher } from '@app/common/domain';
import { Application } from '../../domain/entity';
import { Injectable } from '@nestjs/common';
import { EventStoreService } from '../event-dispatcher.ts/event-store';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmApplicationWriteRepository extends ApplicationWriteRepository {
  constructor(
    @InjectRepository(ApplicationSchema)
    private readonly applicationRepository: Repository<ApplicationSchema>,
    private readonly eventDispatcher: IEventDispatcher,
  ) {
    super();
  }

  async save(application: Application): Promise<void> {
    application.getUnCommitedEvents().forEach((event) => {
      this.eventDispatcher.dispatch(event);
    });
  }

  async getNextId(): Promise<number> {
    return (await this.applicationRepository.count()) + 1;
  }
}

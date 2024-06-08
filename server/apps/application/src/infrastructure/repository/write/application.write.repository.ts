import { ApplicationWriteRepository } from '../../../domain/repository';
import { IEventDispatcher } from '@app/common/domain';
import { Application } from '../../../domain/entity';
import { Inject, Injectable } from '@nestjs/common';
import { EventStoreRepository } from './event-store.repository';

@Injectable()
export class TypeOrmApplicationWriteRepository extends ApplicationWriteRepository {
  constructor(
    private readonly eventDispatcher: IEventDispatcher,
    private readonly eventStoreRepository: EventStoreRepository,
  ) {
    super();
  }

  async save(application: Application): Promise<void> {
    application.getUnCommitedEvents().forEach((event) => {
      this.eventDispatcher.dispatch(event);
    });
  }

  async getNextId(): Promise<number> {
    const currentState = await this.eventStoreRepository.getCurrentState();
    if (currentState.applications.length === 0) return 1;
    const latestApplication =
      currentState.applications[currentState.applications.length - 1];
    console.log('current state:', currentState.applications);
    console.log('latestApplication:', latestApplication);
    return latestApplication.id + 1;
  }
}

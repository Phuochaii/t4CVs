import { ApplicationWriteRepository } from '../../../domain/repository';
import { IEventDispatcher } from '@app/common/domain';
import { Application } from '../../../domain/entity';
import { Injectable } from '@nestjs/common';
import { EventStoreRepository } from './event-store.repository';
import { plainToInstance } from 'class-transformer';
import { ApplicationDeletedEvent } from 'apps/application/src/domain/event';

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
    return latestApplication.id + 1;
  }

  async getById(id: number): Promise<Application | null> {
    const currentState = await this.eventStoreRepository.getCurrentState();
    const application = currentState.applications.find(
      (application) => application.id === id,
    );
    if (!application) return null;
    return plainToInstance(Application, application);
  }

  async getByCampaignId(campaignId: number): Promise<Application[]> {
    const applications = (await this.eventStoreRepository.getCurrentState())
      .applications;

    return applications.filter(
      (application) => application.campaignId === campaignId,
    );
  }
  async deleteById(id: number): Promise<void> {
    this.eventDispatcher.dispatch(
      new ApplicationDeletedEvent({
        id,
      }),
    );
  }
}

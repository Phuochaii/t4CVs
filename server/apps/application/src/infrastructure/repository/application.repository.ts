import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRepository } from '../../domain/repository';
import { ApplicationSchema } from './schema';
import { In, Repository } from 'typeorm';
import {
  GetApplicationByIdDto,
  GetAllApplicationsDto,
  UpdateApplicationDto,
  GetByCampaignIdWithPaginationDto,
  GetByCampaignIdDto,
  GetByUserIdApplicationDto,
  GetByUserIdPaginationApplicationDto,
} from '../../domain/dto';
import { Application } from '../../domain/entity';
import { IEventDispatcher } from '@app/common/domain';
import { UserNotificationSchemaMapper } from './mapper';

export class TypeOrmApplicationRepository extends ApplicationRepository {
  constructor(
    @InjectRepository(ApplicationSchema)
    private readonly applicationRepository: Repository<ApplicationSchema>,
    private readonly mapper: UserNotificationSchemaMapper,
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
    return await this.applicationRepository.count();
  }

  async getById(
    application: GetApplicationByIdDto,
  ): Promise<Application | null> {
    const result = await this.applicationRepository.findOneBy(application);

    return this.mapper.toDomain(result);
  }

  async getAllApplication(
    application: GetAllApplicationsDto,
  ): Promise<Application[]> {
    const skip =
      (application.paginationRequest.page - 1) *
      application.paginationRequest.limit;
    const applicationSchemas = await this.applicationRepository.find({
      skip: skip,
      take: application.paginationRequest.limit,
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    });
    return applicationSchemas.map((schema) => this.mapper.toDomain(schema));
  }

  async updateApplication(
    application: UpdateApplicationDto,
  ): Promise<Application | null> {
    const result = await this.applicationRepository.find({
      where: {
        id: application.id,
      },
    });

    if (!result) {
      return null;
    }
    await this.applicationRepository.update(application.id, {
      status: application.status,
    });
    const updatedApplication =
      await this.applicationRepository.findOneBy(application);
    return this.mapper.toDomain(updatedApplication);
  }

  async getByCampaignIdApplicationWithPagination(
    application: GetByCampaignIdWithPaginationDto,
  ): Promise<Application[] | null> {
    const skip = (application.page - 1) * application.limit;
    const data = await this.applicationRepository.find({
      where: {
        campaignId: In(application.campaignIds),
        status: application.status,
      },
      skip: skip,
      take: application.limit,
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    });
    if (!data) {
      return;
    }
    return data.map((schema) => this.mapper.toDomain(schema));
  }

  async getByCampaignIdApplication(
    application: GetByCampaignIdDto,
  ): Promise<Application[] | null> {
    const data = await this.applicationRepository.find({
      where: {
        campaignId: In(application.campaignIds),
      },
    });
    if (!data) {
      return;
    }

    return data.map((schema) => this.mapper.toDomain(schema));
  }

  async getByUserIdApplication(
    application: GetByUserIdApplicationDto,
  ): Promise<Application[] | null> {
    const data = await this.applicationRepository.find({
      where: {
        userId: application.userId,
        status: application.status,
      },
    });
    if (!data) {
      return;
    }
    return data.map((schema) => this.mapper.toDomain(schema));
  }

  async getByUserIdPaginationApplication(
    application: GetByUserIdPaginationApplicationDto,
  ): Promise<Application[] | null> {
    const skip = (application.page - 1) * application.limit;
    const data = await this.applicationRepository.find({
      where: {
        userId: application.userId,
        status: application.status,
      },
      skip: skip,
      take: application.limit,
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    });
    if (!data) {
      return;
    }
    return data.map((schema) => this.mapper.toDomain(schema));
  }
}

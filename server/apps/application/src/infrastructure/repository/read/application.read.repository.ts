import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationReadRepository } from '../../../domain/repository';
import { ApplicationSchema } from './schema';
import { In, Repository } from 'typeorm';
import { UserNotificationSchemaMapper } from './mapper';
import {
  GetAllApplicationsDto,
  GetApplicationByIdDto,
  GetByCampaignIdDto,
  GetByCampaignIdWithPaginationDto,
  GetByUserIdApplicationDto,
  GetByUserIdPaginationApplicationDto,
  UpdateApplicationDto,
} from '../../../domain/dto';
import { Application } from '../../../domain/entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmApplicationReadRepository extends ApplicationReadRepository {
  constructor(
    @InjectRepository(ApplicationSchema)
    private readonly applicationRepository: Repository<ApplicationSchema>,
    private readonly mapper: UserNotificationSchemaMapper,
  ) {
    super();
  }
  async getById(
    application: GetApplicationByIdDto,
  ): Promise<Application | null> {
    const result = await this.applicationRepository.findOneBy(application);
    if (!result) {
      return null;
    }

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

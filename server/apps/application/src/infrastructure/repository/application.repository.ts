import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRepository } from '../../domain/repository';
import { ApplicationSchema } from '../schema';
import { In, Repository } from 'typeorm';
import {
  ApplicationDto,
  GetApplicationDto,
  GetAllApplicationsDto,
  UpdateApplicationDto,
  GetByCampaignIdApplicationDto,
  GetAllByCampaignIdApplicationDto,
  GetByUserIdApplicationDto,
  GetByUserIdPaginationApplicationDto,
} from '../../domain/dto';
import { Application } from '../../domain/entity';

export class TypeOrmApplicationRepository extends ApplicationRepository {
  constructor(
    @InjectRepository(ApplicationSchema)
    private readonly applicationRepository: Repository<ApplicationSchema>,
  ) {
    super();
  }

  async createApplication(application: ApplicationDto): Promise<Application> {
    application.status = false;
    const now = new Date();
    application.createdAt = now.toISOString();
    application.updateAt = now.toISOString();
    return await this.applicationRepository.save(application);
  }

  async getApplication(
    application: GetApplicationDto,
  ): Promise<Application | null> {
    const result = await this.applicationRepository.findOneBy(application);

    return result;
  }

  async getAllApplication(
    application: GetAllApplicationsDto,
  ): Promise<Application[]> {
    const skip =
      (application.paginationRequest.page - 1) *
      application.paginationRequest.limit;
    const data = await this.applicationRepository.find({
      skip: skip,
      take: application.paginationRequest.limit,
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    });
    return data;
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
    return await this.applicationRepository.findOneBy(application);
  }

  async getByCampaignIdApplication(
    application: GetByCampaignIdApplicationDto,
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
    return data;
  }

  async getAllByCampaignIdApplication(
    application: GetAllByCampaignIdApplicationDto,
  ): Promise<Application[] | null> {
    const data = await this.applicationRepository.find({
      where: {
        campaignId: In(application.campaignIds),
      },
    });
    if (!data) {
      return;
    }

    return data;
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
    return data;
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
    return data;
  }
}

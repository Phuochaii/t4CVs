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
    return await this.applicationRepository.save(application);
  }

  async getApplication(application: GetApplicationDto): Promise<Application> {
    return await this.applicationRepository.findOneBy(application);
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
  ): Promise<Application> {
    await this.applicationRepository.update(application.id, {
      status: true,
    });

    return await this.applicationRepository.findOneBy(application);
  }

  async getByCampaignIdApplication(
    application: GetByCampaignIdApplicationDto,
  ): Promise<Application[]> {
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
    return data;
  }

  async getAllByCampaignIdApplication(
    application: GetAllByCampaignIdApplicationDto,
  ): Promise<Application[]> {
    const data = await this.applicationRepository.find({
      where: {
        campaignId: In(application.campaignIds),
      },
    });

    return data;
  }

  async getByUserIdApplication(
    application: GetByUserIdApplicationDto,
  ): Promise<Application[]> {
    const data = await this.applicationRepository.find({
      where: {
        userId: application.userId,
      },
    });
    return data;
  }

  async getByUserIdPaginationApplication(
    application: GetByUserIdPaginationApplicationDto,
  ): Promise<Application[]> {
    const skip = (application.page - 1) * application.limit;
    const data = await this.applicationRepository.find({
      where: {
        userId: application.userId,
      },
      skip: skip,
      take: application.limit,
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    });
    return data;
  }
}

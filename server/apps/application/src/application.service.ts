import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationService {
  private readonly applications: Application[] = [];
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}
  async store(data: CreateApplicationDto) {
    try {
      const application = this.applicationRepository.create(data);
      application.status = false;
      console.log(data);
      const now = new Date();
      application.createdAt = now.toISOString().split('T')[0];
      application.updateAt = now.toISOString().split('T')[0];
      return await this.applicationRepository.save(application);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFail(id: number) {
    try {
      const guest = await this.applicationRepository.findOneBy({ id });
      return guest;
    } catch {
      console.log(id);
      throw new NotFoundException();
    }
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const data = await this.applicationRepository.find({
      skip: skip,
      take: limit,
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    });
    return data;
  }

  async findAllApplicationByCampaignId(
    page: number,
    limit: number,
    campaignIds: number[],
    status: boolean | undefined,
  ) {
    const skip = (page - 1) * limit;
    const data = await this.applicationRepository.find({
      where: {
        campaignId: In(campaignIds),
        status,
      },
      skip: skip,
      take: limit,
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    });
    return data;
  }

  async delete(id: number) {
    await this.applicationRepository.delete(id);
  }

  async update(id: number) {
    const application = await this.applicationRepository.findOneBy({ id });
    application.status = true;
    const now = new Date();
    application.updateAt = now.toISOString().split('T')[0];
    const updatedApplication =
      await this.applicationRepository.save(application);

    return updatedApplication;
  }
}

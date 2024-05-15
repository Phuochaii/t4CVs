import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAggregate } from '../../domain/aggregate';
import { Job } from '../schemas';
import { Repository } from 'typeorm';
import { JobMapper } from '../mapper';
import { CreateJobDto } from '../../dto/Req/create-job.dto';
import { QueryDTO } from '../../domain/dto/Req/query.dto';
import { UpdateJobDto } from '../../domain/dto/Req/update-job.dto';

@Injectable()
export class TypeOrmJobRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}
  async findJobByCampaignId(campaignId: number): Promise<JobAggregate> {
    const result = await this.jobRepository.findOne({
      where: {
        campaignId,
      },
      relations: [
        'jobDetail',
        'major',
        'level',
        'currency',
        'fields',
        'exp',
        'type',
        'locations',
      ],
    });
    return new JobMapper().toDomain(result);
  }
  async findJobById(id: number): Promise<JobAggregate> {
    const result = await this.jobRepository.findOne({
      where: {
        id,
      },
      relations: [
        'jobDetail',
        'major',
        'level',
        'currency',
        'fields',
        'exp',
        'type',
        'locations',
      ],
    });
    return new JobMapper().toDomain(result);
  }
  async createJob(job: CreateJobDto): Promise<JobAggregate> {
    const result = await this.jobRepository.save(job);
    return new JobMapper().toDomain(result);
  }
  async saveJob(job: JobAggregate): Promise<JobAggregate> {
    const result = await this.jobRepository.save(job);
    return new JobMapper().toDomain(result);
  }
  async searchJob(newQuery: QueryDTO): Promise<Job[]> {
    return await this.jobRepository.find({
      where: {
        ...newQuery,
      },
      order: {
        updateAt: 'DESC',
      },
      relations: [
        'major',
        'level',
        'currency',
        'fields',
        'exp',
        'type',
        'locations',
      ],
    });
  }
  async updateJobStatus(data: UpdateJobDto): Promise<string> {
    const result = await this.jobRepository.update(data.id, {
      status: data.status,
    });
    if (result.affected === 0) {
      throw new BadRequestException('Not found');
    }
    return 'Update success';
  }
}

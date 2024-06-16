import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAggregate } from '../../domain/aggregate';
import { Job } from '../schemas';
import { In, Repository } from 'typeorm';
import { JobMapper } from '../mapper';
import { CreateJobDto } from '../../domain/dto/Req/create-job.dto';
import { QueryDTO } from '../../domain/dto/Req/query.dto';
import { JobRepository } from '../../domain/repository';
import { UpdateJobStatusDto } from '../../domain/dto/Req/update-job-status.dto';

@Injectable()
export class TypeOrmJobRepository extends JobRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {
    super();
  }

  async deleteJob(id: number) {
    return await this.jobRepository.delete(id);
  }

  async findJobByCampaignId(campaignId: number): Promise<JobAggregate> {
    const job = await this.jobRepository.findOne({
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
    if (!job) return null;
    return new JobMapper().toDomain(job);
  }

  async findJobsByCampaignIds(campaignIds: number[]): Promise<JobAggregate[]> {
    const jobs = await this.jobRepository.find({
      where: {
        campaignId: In(campaignIds),
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
    if (!jobs) return null;
    const result = jobs.map((job) => {
      return new JobMapper().toDomain(job);
    });
    return result;
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
    if (!result) return null;
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
  async updateJobStatus(data: UpdateJobStatusDto): Promise<boolean> {
    const result = await this.jobRepository.update(data.id, {
      status: data.status,
    });
    if (result.affected === 0) {
      return false;
    }
    return true;
  }
}

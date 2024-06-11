import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAggregate } from '../../domain/aggregate';
import { Job } from '../schemas';
import { In, Repository } from 'typeorm';
import { JobMapper } from '../mapper';
import { CreateJobDto } from '../../domain/dto/Req/create-job.dto';
import { QueryDTO } from '../../domain/dto/Req/query.dto';
import { FindJobByCampaignIdDto } from '../../domain/dto/Resp/find-job-by-campaignId.dto';
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

  async findJobByCampaignId(
    campaignId: number,
  ): Promise<FindJobByCampaignIdDto> {
    const job = await this.jobRepository.findOne({
      where: {
        campaignId,
      },
      relations: ['jobDetail'],
    });
    if (!job) return null;
    const result: FindJobByCampaignIdDto = {
      titleRecruitment: job.titleRecruitment,
      companyId: job.companyId,
      salaryMax: job.salaryMax,
      salaryMin: job.salaryMin,
      campaignId: job.campaignId,
      status: job.status,
      expiredDate: job.expiredDate,
      locations: job.locations,
      jobDetail: job.jobDetail,
    };
    return result;
  }

  async findJobsByCampaignIds(
    campaignIds: number[],
  ): Promise<FindJobByCampaignIdDto[]> {
    const jobs = await this.jobRepository.findBy({
      campaignId: In(campaignIds),
    });
    if (!jobs) return null;
    const result = jobs.map((job) => {
      const result: FindJobByCampaignIdDto = {
        titleRecruitment: job.titleRecruitment,
        companyId: job.companyId,
        salaryMax: job.salaryMax,
        salaryMin: job.salaryMin,
        campaignId: job.campaignId,
        status: job.status,
        expiredDate: job.expiredDate,
        locations: job.locations,
        jobDetail: job.jobDetail,
      };
      return result;
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

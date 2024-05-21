import { JobAggregate } from '../aggregate/job.aggregate';
import { CreateJobDto } from '../dto/Req/create-job.dto';
import { QueryDTO } from '../dto/Req/query.dto';
import { UpdateJobDto } from '../dto/Req/update-job.dto';
import { Job } from '../entities';

export abstract class JobRepository {
  abstract updateJobStatus(data: UpdateJobDto): Promise<string>;
  abstract findJobById(id: number): Promise<JobAggregate>;
  abstract searchJob(newQuery: QueryDTO): Promise<JobAggregate[]>;
  abstract saveJob(job: JobAggregate): Promise<JobAggregate>;
  abstract createJob(createJobDto: CreateJobDto): Promise<JobAggregate>;
  abstract findJobByCampaignId(campaignId: number): Promise<JobAggregate>;
  abstract find(): Promise<JobAggregate[]>;
  abstract find(query): Promise<JobAggregate[]>;
  abstract findOneBy(query): Promise<JobAggregate>;
  abstract findOne(query): Promise<JobAggregate>;
  abstract save(
    createJobDto: CreateJobDto | JobAggregate,
  ): Promise<JobAggregate>;
  abstract update(id: number, query): Promise<void>;
}

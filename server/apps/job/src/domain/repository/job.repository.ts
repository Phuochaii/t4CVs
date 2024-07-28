import { JobAggregate } from '../aggregate/job.aggregate';
import { CreateJobDto } from '../dto/Req/create-job.dto';
import { QueryDTO } from '../dto/Req/query.dto';
import { UpdateJobStatusDto } from '../dto/Req/update-job-status.dto';

export abstract class JobRepository {
  abstract deleteJob(id: number);
  abstract findJobsByCampaignIds(
    campaignIds: number[],
  ): Promise<JobAggregate[]>;
  abstract updateJobStatus(data: UpdateJobStatusDto): Promise<boolean>;
  abstract findJobById(id: number): Promise<JobAggregate>;
  abstract searchJob(newQuery: QueryDTO): Promise<JobAggregate[]>;
  abstract saveJob(job: JobAggregate): Promise<JobAggregate>;
  abstract createJob(createJobDto: CreateJobDto): Promise<JobAggregate>;
  abstract findJobByCampaignId(campaignId: number): Promise<JobAggregate>;
}

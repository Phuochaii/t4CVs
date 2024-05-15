import { CreateJobDto } from '../dto/Req/create-job.dto';
import { JobDetail } from '../entities';

export abstract class JobDetailRepository {
  abstract createJobDetail(createJobDto: CreateJobDto): Promise<JobDetail>;
  // abstract find(): Promise<JobDetail[]>;
  // abstract findOneBy(query): Promise<JobDetail>;
  // abstract findOne(query): Promise<JobDetail>;
  //abstract save(createJobDto: CreateJobDto): Promise<JobDetail>;
}

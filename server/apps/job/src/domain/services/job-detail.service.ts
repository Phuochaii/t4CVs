import { CreateJobDto } from '../../domain/dto/Req/create-job.dto';
import { JobDetail } from '../entities';
import { JobDetailRepository } from '../repository';

export class JobDetailService {
  constructor(private JobDetailRepository: JobDetailRepository) {}
  async createJobDetail(createJobDto: CreateJobDto) {
    return await this.JobDetailRepository.createJobDetail(createJobDto);
  }

  async deleteJobDetail(id: number) {
    return await this.JobDetailRepository.deleteJobDetail(id);
  }

  async updateJobDetail(data: JobDetail) {
    return await this.JobDetailRepository.updateJobDetail(data);
  }
}

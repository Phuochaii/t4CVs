import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobDetail } from '../schemas';
import { CreateJobDto } from '../../domain/dto/Req/create-job.dto';
import { JobDetailRepository } from '../../domain/repository';

@Injectable()
export class TypeOrmJobDetailRepository extends JobDetailRepository {
  constructor(
    @InjectRepository(JobDetail)
    private readonly jobDetailRepository: Repository<JobDetail>,
  ) {
    super();
  }

  async createJobDetail(createJobDto: CreateJobDto): Promise<JobDetail> {
    return await this.jobDetailRepository.save(createJobDto);
  }

  async deleteJobDetail(id: number): Promise<boolean> {
    const result = await this.jobDetailRepository.delete(id);
    if (result.affected === 0) {
      return false;
    }
    return true;
  }
}

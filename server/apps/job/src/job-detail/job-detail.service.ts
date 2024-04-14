import { Injectable } from '@nestjs/common';
import { JobDetail } from '../entities/job-detail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobDto } from '../dto/Req/create-job.dto';

@Injectable()
export class JobDetailService {
  constructor(
    @InjectRepository(JobDetail)
    private JobDetailRepository: Repository<JobDetail>,
  ) {}
  async createJobDetail(createJobDto: CreateJobDto) {
    return await this.JobDetailRepository.save(createJobDto);
  }

  findAll() {
    return `This action returns all jobDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobDetail`;
  }

  // update(id: number, updateJobDetailDto: UpdateJobDetailDto) {
  //   return `This action updates a #${id} jobDetail`;
  // }

  remove(id: number) {
    return `This action removes a #${id} jobDetail`;
  }
}

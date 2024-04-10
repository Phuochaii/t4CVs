import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private JobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    await this.JobRepository.save(createJobDto);
  }

  findAll() {
    return this.JobRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  // update(id: number, updateJobDto: UpdateJobDto) {
  //   return `This action updates a #${id} job`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} job`;
  // }
}

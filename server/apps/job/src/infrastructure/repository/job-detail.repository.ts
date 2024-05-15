import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobDetail } from '../schemas';
import { CreateJobDto } from '../../domain/dto/Req/create-job.dto';

@Injectable()
export class TypeOrmJobDetailRepository {
  constructor(
    @InjectRepository(JobDetail)
    private readonly jobDetailRepository: Repository<JobDetail>,
  ) {}

  // async findAll() {
  //   return this.currencyRepository.find();
  // }
  // async findById(id: number): Promise<Currency> {
  //   return this.currencyRepository.findOneBy({ id });
  // }

  // async findOneByName(name: string): Promise<Currency> {
  //   return this.currencyRepository.findOneBy({ name });
  // }
  async createJobDetail(createJobDto: CreateJobDto): Promise<JobDetail> {
    return await this.jobDetailRepository.save(createJobDto);
  }
}

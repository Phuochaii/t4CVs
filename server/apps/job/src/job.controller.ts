import { Controller } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/Req/create-job.dto';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateJobDto } from './dto/Req/update-job.dto';
import { CreateBaseDto } from './dto/Req/createBase.dto';
import { QueryDTO } from './dto/Req/query.dto';

@Controller()
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @MessagePattern({ cmd: 'create_job' })
  createJob(job: CreateJobDto) {
    this.jobService.create(job);
    return 'Job created successfully!';
  }

  @MessagePattern({ cmd: 'get_all_jobs' })
  findAllJobs(query: QueryDTO) {
    return this.jobService.findAll(query);
  }

  @MessagePattern({ cmd: 'get_valid_jobs' })
  findValidJobs() {
    return this.jobService.findValidJobs();
  }

  @MessagePattern({ cmd: 'find_job_by_id' })
  findJobById(id: number) {
    return this.jobService.findJobById(id);
  }

  @MessagePattern({ cmd: 'update_job_status' })
  updateJobStatus(data: UpdateJobDto) {
    return this.jobService.updateJobStatus(data);
  }

  @MessagePattern({ cmd: 'create_major' })
  createMajor(majors: CreateBaseDto) {
    return this.jobService.createMajor(majors);
  }

  @MessagePattern({ cmd: 'get_all_major' })
  getAllMajor() {
    return this.jobService.findAllMajor();
  }
  @MessagePattern({ cmd: 'create_level' })
  createLevel(levels: CreateBaseDto) {
    return this.jobService.createLevel(levels);
  }

  @MessagePattern({ cmd: 'get_all_level' })
  getAllLevel() {
    return this.jobService.findAllLevel();
  }

  @MessagePattern({ cmd: 'create_currency' })
  createCurrency(currencies: CreateBaseDto) {
    return this.jobService.createCurrency(currencies);
  }

  @MessagePattern({ cmd: 'get_all_currency' })
  getAllCurrency() {
    return this.jobService.findAllCurrency();
  }

  @MessagePattern({ cmd: 'create_field' })
  createField(fields: CreateBaseDto) {
    return this.jobService.createField(fields);
  }

  @MessagePattern({ cmd: 'get_all_field' })
  getAllField() {
    return this.jobService.findAllField();
  }
}

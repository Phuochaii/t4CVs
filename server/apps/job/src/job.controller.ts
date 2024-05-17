import { Controller } from '@nestjs/common';
import { JobService } from './domain/job.service';
import { CreateJobDto } from './domain/dto/Req/create-job.dto';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateJobDto } from './domain/dto/Req/update-job.dto';
import { CreateBaseDto } from './domain/dto/Req/createBase.dto';
import { QueryDTO } from './domain/dto/Req/query.dto';

@Controller()
export class JobController {
  constructor(private readonly jobService: JobService) {}

  hello(): string {
    return 'Hello World!';
  }

  @MessagePattern({ cmd: 'find_job_by_campaignId' })
  findJobByCampaignId(campaignId: number) {
    return this.jobService.findJobByCampaignId(campaignId);
  }

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
  findValidJobs(query: any) {
    return this.jobService.findValidJobs(query);
  }

  @MessagePattern({ cmd: 'find_job_by_id' })
  findJobById(id: number) {
    return this.jobService.findJobById(id);
  }

  @MessagePattern({ cmd: 'update_job_status' })
  updateJobStatus(data: UpdateJobDto) {
    return this.jobService.updateJobStatus(data);
  }

  @MessagePattern({ cmd: 'get_job_info' })
  getJobInfo() {
    return this.jobService.createJobInfo();
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

  @MessagePattern({ cmd: 'create_location' })
  createLocation(fields: CreateBaseDto) {
    return this.jobService.createLocation(fields);
  }

  @MessagePattern({ cmd: 'get_all_location' })
  getAllLocation() {
    return this.jobService.findAllLocation();
  }
  @MessagePattern({ cmd: 'create_exp' })
  createExp(exps: CreateBaseDto) {
    return this.jobService.createExp(exps);
  }

  @MessagePattern({ cmd: 'get_all_exp' })
  getAllExp() {
    return this.jobService.findAllExp();
  }
  @MessagePattern({ cmd: 'create_type' })
  createJobType(types: CreateBaseDto) {
    return this.jobService.createType(types);
  }

  @MessagePattern({ cmd: 'get_all_type' })
  getAllJobType() {
    return this.jobService.findAllType();
  }
}

import { Controller } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/Req/create-job.dto';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateJobDto } from './dto/Req/update-job.dto';
import { MajorService } from './major/major.service';
import { CreateMajorDto } from './dto/Req/createMajor.dto';

@Controller()
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly majorService: MajorService,
  ) {}

  @MessagePattern({ cmd: 'create_job' })
  createJob(job: CreateJobDto) {
    this.jobService.create(job);
    return 'Job created successfully!';
  }

  @MessagePattern({ cmd: 'get_all_jobs' })
  findAllJobs() {
    return this.jobService.findAll();
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
  createMajor(major: CreateMajorDto) {
    return this.majorService.create(major);
  }

  @MessagePattern({ cmd: 'get_all_major' })
  getAllMajor() {
    return this.majorService.findAll();
  }
}

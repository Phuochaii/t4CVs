import { Controller } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/Req/create-job.dto';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateJobDto } from './dto/Req/update-job.dto';

@Controller()
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // @Post()
  // create(@Body() createJobDto: CreateJobDto) {
  //   return this.jobService.create(createJobDto);
  // }

  // @Get()
  // findAll() {
  //   return this.jobService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.jobService.findOne(+id);
  // }

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
  //   return this.jobService.update(+id, updateJobDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.jobService.remove(+id);
  // }
}

import { Controller } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { MessagePattern } from '@nestjs/microservices';

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
  //   return this.jobService.update(+id, updateJobDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.jobService.remove(+id);
  // }
}

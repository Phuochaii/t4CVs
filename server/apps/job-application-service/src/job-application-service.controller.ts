import { Controller, Get } from '@nestjs/common';
import { JobApplicationServiceService } from './job-application-service.service';

@Controller()
export class JobApplicationServiceController {
  constructor(private readonly jobApplicationServiceService: JobApplicationServiceService) {}

  @Get()
  getHello(): string {
    return this.jobApplicationServiceService.getHello();
  }
}

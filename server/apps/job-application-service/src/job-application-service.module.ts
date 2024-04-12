import { Module } from '@nestjs/common';
import { JobApplicationController } from './job-application-service.controller';
import { JobApplicationService } from './job-application-service.service';

@Module({
  imports: [],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationServiceModule { }
z
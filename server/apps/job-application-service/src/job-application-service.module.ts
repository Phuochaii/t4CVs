import { Module } from '@nestjs/common';
import { JobApplicationServiceController } from './job-application-service.controller';
import { JobApplicationServiceService } from './job-application-service.service';

@Module({
  imports: [],
  controllers: [JobApplicationServiceController],
  providers: [JobApplicationServiceService],
})
export class JobApplicationServiceModule {}

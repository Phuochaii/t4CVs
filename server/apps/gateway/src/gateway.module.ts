import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [ApplicationModule, JobModule],
  controllers: [],
  providers: [],
})
export class GatewayModule {}

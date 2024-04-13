import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { JobApplicationModule } from './job-application/job-application.module';
import { JobModule } from './job/job.module';
@Module({
  imports: [
    // JobApplicationModule,
    JobModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}

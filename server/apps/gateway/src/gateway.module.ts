import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { JobModule } from './job/job.module';

import { UploadModule } from './upload/upload.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
@Module({
  imports: [ApplicationModule, JobModule, UploadModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}

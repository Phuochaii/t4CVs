import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { JobModule } from './job/job.module';
import { CompanyModule } from './company/company.module';
import { UploadModule } from './upload/upload.module';

import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { NotificationModule } from './notification/notification.module';
import { Company } from 'apps/company-service/src/entities/company.entity';

@Module({
  imports: [
    ApplicationModule,
    NotificationModule,
    JobModule,
    UploadModule,
    CompanyModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}

import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { JobModule } from './job/job.module';
import { CompanyModule } from './company/company.module';
import { UploadModule } from './upload/upload.module';

import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { CVModule } from './cv/cv.module';
import { NotificationModule } from './notification/notification.module';
import { Company } from 'apps/company-service/src/entities/company.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ApplicationModule,
    NotificationModule,
    JobModule,
    UploadModule,
    CompanyModule,
    UserModule,
    CVModule,
    ConfigModule.forRoot({ envFilePath: '.env.example' }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}

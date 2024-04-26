import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { JobModule } from './job/job.module';
import { CompanyModule } from './company/company.module';
import { UploadModule } from './upload/upload.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { CVModule } from './cv/cv.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { EmployerModule } from './employer/employer.module';

@Module({
  imports: [
    ApplicationModule,
    NotificationModule,
    JobModule,
    UploadModule,
    CompanyModule,
    UserModule,
    CVModule,
    EmployerModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}

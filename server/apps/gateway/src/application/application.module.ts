import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CompanyModule } from '../company/company.module';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';
import { ApplicationController } from './application.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { APPLICATION_PACKAGE_NAME } from '@app/common/proto/application';
import { CVModule } from '../cv/cv.module';
import { EmployerModule } from '../employer/employer.module';
import { JobModule } from '../job/job.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: APPLICATION_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50053',
          package: APPLICATION_PACKAGE_NAME,
          protoPath: join(__dirname, './proto/application.proto'),
        },
      },
    ]),
    CompanyModule,
    NotificationModule,
    UserModule,
    CVModule,
    EmployerModule,
    JobModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}

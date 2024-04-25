import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CompanyService } from '../company/company.service';
import { CompanyModule } from '../company/company.module';
import { NotificationModule } from '../notification/notification.module';
import { NotificationService } from '../notification/notification.service';
import { ApplicationController } from './application.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { APPLICATION_PACKAGE_NAME } from '@app/common/proto/application';
import { NOTIFICATION_PACKAGE_NAME } from '@app/common/proto/notification';
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
    // ClientsModule.register([
    //   {
    //     name: 'COMPANY',
    //     transport: Transport.TCP,
    //     options: {
    //       host: 'localhost',
    //       port: 3003,
    //     },
    //   },
    // ]),
    CompanyModule,
    NotificationModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}

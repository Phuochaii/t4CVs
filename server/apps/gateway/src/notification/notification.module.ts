import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_PACKAGE_NAME } from '@app/common/proto/notification';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATION_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50052',
          package: NOTIFICATION_PACKAGE_NAME,
          protoPath: join(__dirname, './proto/notification.proto'),
        },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}

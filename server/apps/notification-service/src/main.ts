import { NestFactory } from '@nestjs/core';
import { NotificationServiceModule } from './notification-service.module';
import { Transport } from '@nestjs/microservices';
import { NOTIFICATION_PACKAGE_NAME } from '@app/common/proto/notification';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NotificationServiceModule, {
    transport: Transport.GRPC,
    options: {
      url: 'notification:50052',
      package: NOTIFICATION_PACKAGE_NAME,
      protoPath: join(__dirname, './proto/notification.proto'),
    },
  });
  await app.listen();
}
bootstrap();

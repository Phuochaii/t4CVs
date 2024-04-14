import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { APPLICATION_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ApplicationModule, {
    transport: Transport.GRPC,
    options: {
      package: APPLICATION_PACKAGE_NAME,
      protoPath: join(__dirname, './proto/application.proto'),
    },
  });
  await app.listen();
}
bootstrap();

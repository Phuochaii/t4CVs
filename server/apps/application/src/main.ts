import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';
// import { AppModule } from './old/app.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { APPLICATION_PACKAGE_NAME } from '@app/common/proto/application';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ApplicationModule, {
    transport: Transport.GRPC,
    options: {
      url: 'application:50053',
      protoPath: join(__dirname, './proto/application.proto'),
      package: APPLICATION_PACKAGE_NAME,
    },
  });
  await app.listen();
}
bootstrap();

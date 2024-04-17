import { NestFactory } from '@nestjs/core';
import { JobApplicationServiceModule } from './job-application-service.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { JOBAPPLICATION_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(JobApplicationServiceModule,{
    transport: Transport.GRPC,
    options: {
      url: "localhost:50051",
      package: JOBAPPLICATION_PACKAGE_NAME,
      protoPath: join(__dirname, './proto/job-application.proto'),
  }});
  await app.listen();
}
bootstrap();

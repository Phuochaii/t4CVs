import { NestFactory } from '@nestjs/core';
import { JobApplicationServiceModule } from './job-application-service.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(JobApplicationServiceModule,{
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'job_application',
      protoPath: join(__dirname, './proto/job-application.proto')
  }});
  await app.listen();
}
bootstrap();

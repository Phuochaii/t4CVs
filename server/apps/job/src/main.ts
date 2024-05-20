import { NestFactory } from '@nestjs/core';
import { JobModule } from './job.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(JobModule, {
    transport: Transport.TCP,
    options: {
      host: 'job',
      port: 3001,
    },
  });
  await app.listen();
}
bootstrap();

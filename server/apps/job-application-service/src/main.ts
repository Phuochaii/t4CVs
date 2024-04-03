import { NestFactory } from '@nestjs/core';
import { JobApplicationServiceModule } from './job-application-service.module';

async function bootstrap() {
  const app = await NestFactory.create(JobApplicationServiceModule);
  await app.listen(3000);
}
bootstrap();

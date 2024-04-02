import { NestFactory } from '@nestjs/core';
import { CvServiceModule } from './cv-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CvServiceModule);
  await app.listen(3000);
}
bootstrap();

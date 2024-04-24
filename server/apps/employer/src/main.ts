import { NestFactory } from '@nestjs/core';
import { EmployerModule } from './employer.module';

async function bootstrap() {
  const app = await NestFactory.create(EmployerModule);
  await app.listen(3000);
}
bootstrap();

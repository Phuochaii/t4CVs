import { NestFactory } from '@nestjs/core';
import { EmployerServiceModule } from './employer.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(EmployerServiceModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3005,
    },
  });
  await app.listen();

  // const app = await NestFactory.create(CompanyServiceModule);
  // await app.listen(3000);
}
bootstrap();

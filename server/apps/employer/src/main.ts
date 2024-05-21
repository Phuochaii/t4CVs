import { NestFactory } from '@nestjs/core';
import { EmployerModule } from './employer.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(EmployerModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3005,
    },
  });
  await app.listen();

  // const app = await NestFactory.create(CompanyServiceModule);
  // await app.listen(3000);
}
bootstrap();

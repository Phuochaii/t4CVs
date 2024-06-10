import { NestFactory } from '@nestjs/core';
import { CompanyServiceModule } from './company-service.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CompanyServiceModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3003,
    },
  });
  await app.listen();

  // const app = await NestFactory.create(CompanyServiceModule);
  // await app.listen(3000);
}
bootstrap();

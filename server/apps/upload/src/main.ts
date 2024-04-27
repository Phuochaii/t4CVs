import { NestFactory } from '@nestjs/core';
import { UploadModule } from './upload.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UploadModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3004,
    },
  });
  await app.listen();

  // const app = await NestFactory.create(UploadModule);
  // await app.listen(3004);
}
bootstrap();

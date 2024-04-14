// import { NestFactory } from '@nestjs/core';
// import { CvServiceModule } from './cv-service.module';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     CvServiceModule,
//     {
//       transport: Transport.TCP,
//       options: {
//         port: 3001,
//       },
//     },
//   );
//   await app.listen();
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { CvServiceModule } from './cv-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CvServiceModule);
  await app.listen(3001);
}
bootstrap();

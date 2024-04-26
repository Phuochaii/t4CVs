import { Module } from '@nestjs/common';
import { CVService } from './cv.service';
import { CVController } from './cv.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CV',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3006,
        },
      },
    ]),
  ],
  controllers: [CVController],
  providers: [CVService],
  exports: [CVService],
})
export class CVModule {}

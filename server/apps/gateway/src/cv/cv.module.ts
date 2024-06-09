import { Module } from '@nestjs/common';
import { CVService } from './cv.service';
import { CVController } from './cv.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CV',
        transport: Transport.TCP,
        options: {
          host: 'cv',
          port: 3006,
        },
      },
    ]),
    UploadModule,
  ],
  controllers: [CVController],
  providers: [CVService],
  exports: [CVService],
})
export class CVModule {}

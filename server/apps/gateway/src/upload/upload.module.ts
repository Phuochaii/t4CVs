import { Module, HttpCode } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UPLOAD',
        transport: Transport.TCP,
        options: {
          host: 'upload',
          port: 3004,
        },
      },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}

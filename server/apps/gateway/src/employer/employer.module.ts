import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMPLOYER',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3005,
        },
      },
    ]),
    UploadModule,
  ],
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}

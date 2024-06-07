import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMPLOYER',
        transport: Transport.TCP,
        options: {
          host: 'employer',
          port: 3005,
        },
      },
    ]),
    AuthenticationModule,
    UploadModule,
  ],
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}

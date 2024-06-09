import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployerModule } from '../employer/employer.module';
import { UploadModule } from '../upload/upload.module';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMPANY',
        transport: Transport.TCP,
        options: {
          host: 'company',
          port: 3003,
        },
      },
    ]),
    EmployerModule,
    UploadModule,
    AuthenticationModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}

import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'JOB',
        transport: Transport.TCP,
        options: {
          host: 'job',
          port: 3001,
        },
      },
    ]),
    CompanyModule,
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}

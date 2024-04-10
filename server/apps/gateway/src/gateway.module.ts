import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JobApplicationModule } from './job-application/job-application.module';
@Module({
  imports: [
    // JobApplicationModule,
    ClientsModule.register([
      // {
      //   name: 'CV',
      //   transport: Transport.TCP,
      //   options: {
      //     host: 'localhost',
      //     port: 3001,
      //   },
      // },
      {
        name: 'JOB',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}

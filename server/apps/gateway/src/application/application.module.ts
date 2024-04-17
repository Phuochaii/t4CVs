import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { APPLICATION_PACKAGE_NAME } from '@app/common';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: APPLICATION_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5000',
          package: APPLICATION_PACKAGE_NAME,
          protoPath: join(__dirname, './proto/application.proto'),
        },
      },
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}

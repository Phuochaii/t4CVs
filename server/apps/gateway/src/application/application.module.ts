import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApplicationController } from './application.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ApplicationController],
  providers: [
    {
      provide: 'APPLICATION_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('localhost'),
            port: configService.get('4000'),
          },
        }),
      inject: [ConfigService],
    },
  ],
})
export class ApplicationModule {}

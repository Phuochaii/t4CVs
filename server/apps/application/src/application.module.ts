import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ConfigModule } from '@nestjs/config';
import { ApplicationApplicationModule } from './application-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './configs/.env',
    }),
    ApplicationApplicationModule,
    ,
  ],
  controllers: [ApplicationController],
})
export class ApplicationModule {}

import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ConfigModule } from '@nestjs/config';
import { DomainApplicationModule } from './domain-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './configs/.env',
    }),
    DomainApplicationModule,
  ],
  controllers: [ApplicationController],
})
export class ApplicationModule {}

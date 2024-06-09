import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ConfigModule } from '@nestjs/config';
import { DomainApplicationModule } from './domain-application.module';
import { CommandService } from './cqrs/command.service';
import { QueryService } from './cqrs/query.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DomainApplicationModule,
  ],
  providers: [CommandService, QueryService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}

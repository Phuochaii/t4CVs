import { Module } from '@nestjs/common';
import { NotificationController } from './notification-service.controller';
import { ConfigModule } from '@nestjs/config';
import { NotificationApplicationModule } from './notification-application.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NotificationApplicationModule,
  ],
  controllers: [NotificationController],
})
export class NotificationServiceModule { }

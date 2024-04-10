import { Module } from '@nestjs/common';
import { NotificationController } from './notification-service.controller';
import { NotificationServiceService } from './notification-service.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationServiceService],
})
export class NotificationServiceModule { }

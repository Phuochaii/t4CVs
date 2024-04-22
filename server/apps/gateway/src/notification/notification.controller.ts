import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationRequest } from '@app/common/proto/notification';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() request: SendNotificationRequest){
    return this.notificationService.create(request);
  }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationRequest } from '@app/common/proto/notification';
import { PaginationRequest } from '@app/common';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Get("/:userId")
  getAllOfUser(
    @Param('userId') userId: number,
    @Query() paginationRequest: PaginationRequest = new PaginationRequest()
  ) {
    return this.notificationService.getAllOfUser(userId, paginationRequest);
  }
}

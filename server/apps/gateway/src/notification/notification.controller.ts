import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { status } from '@app/common/proto/notification';
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

  @Put("/:userId/:notificationId")
  updateStatusOfUser(
    @Param('userId') userId: number,
    @Param('notificationId') notificationId: number,
    @Body('status') status: status
  ) {
    return this.notificationService.updateStatus(userId, notificationId, status);
  }
}

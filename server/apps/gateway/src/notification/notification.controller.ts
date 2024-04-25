import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  NotificationService,
  NotificationUserId,
  NotificationUserRole,
} from './notification.service';
import { status } from '@app/common/proto/notification';
import { PaginationRequest } from '@app/common';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/:role/:userId')
  getAllOfUser(
    @Param('userId') userId: number,
    @Param('role') role: NotificationUserRole,
    @Query() paginationRequest: PaginationRequest = new PaginationRequest(),
  ) {
    if (!Object.values(NotificationUserRole).includes(role)) {
      throw new BadRequestException('Invalid role');
    }

    return this.notificationService.getAllOf(
      new NotificationUserId(userId, role),
      paginationRequest,
    );
  }

  @Put('/:role/:userId/:notificationId')
  updateStatusOfUser(
    @Param('userId') userId: number,
    @Param('role') role: NotificationUserRole,
    @Param('notificationId') notificationId: number,
    @Body('status') status: status,
  ) {
    if (!Object.values(NotificationUserRole).includes(role)) {
      throw new BadRequestException('Invalid role');
    }

    return this.notificationService.updateStatus(
      new NotificationUserId(userId, role),
      notificationId,
      status,
    );
  }
}

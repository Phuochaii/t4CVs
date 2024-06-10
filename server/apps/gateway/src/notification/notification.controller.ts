import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  NotificationService,
  NotificationUserId,
  NotificationUserRole,
} from './notification.service';
import { status } from '@app/common/proto/notification';
import { PaginationRequest } from '@app/common/dto/pagination';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, PermissionsGuard, UserClaims } from '../authorization';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Get('/user')
  getAllOfUser(
    @GetUser() user: UserClaims,
    @Query() paginationRequest: PaginationRequest = new PaginationRequest(),
  ) {
    const role = NotificationUserRole.USER;
    return this.notificationService.getAllOf(
      new NotificationUserId(user.sub, role),
      paginationRequest,
    );
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Get('/hr')
  getAllOfEmployer(
    @GetUser() user: UserClaims,
    @Query() paginationRequest: PaginationRequest = new PaginationRequest(),
  ) {
    const role = NotificationUserRole.HR;

    return this.notificationService.getAllOf(
      new NotificationUserId(user.sub, role),
      paginationRequest,
    );
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Put('user/:notificationId')
  updateStatusOfUser(
    @GetUser() user: UserClaims,
    @Param('notificationId') notificationId: number,
    @Body('status') status: status,
  ) {
    const role = NotificationUserRole.USER;

    return this.notificationService.updateStatus(
      new NotificationUserId(user.sub, role),
      notificationId,
      status,
    );
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Put('hr/:notificationId')
  updateStatusOfHr(
    @GetUser() user: UserClaims,
    @Param('notificationId') notificationId: number,
    @Body('status') status: status,
  ) {
    const role = NotificationUserRole.HR;

    return this.notificationService.updateStatus(
      new NotificationUserId(user.sub, role),
      notificationId,
      status,
    );
  }
}

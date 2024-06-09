import { RpcException } from '@nestjs/microservices';
import {
  UpdateNotificationStatusDto,
  UpdateNotificationStatusResponseDto,
} from '../dto';
import { UserNotificationRepository } from '../repository';
import { BaseService } from './base.service';
import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { Metadata, status as GrpcStatus } from '@grpc/grpc-js'
import { GrpcException } from '@app/common/grpc';

export class UpdateNotificationStatusService
  implements BaseService<UpdateNotificationStatusResponseDto>
{
  constructor(
    private readonly userNotificationRepository: UserNotificationRepository,
  ) {}

  async execute({
    notificationId,
    status,
    user,
  }: UpdateNotificationStatusDto): Promise<UpdateNotificationStatusResponseDto> {
    const userNotification =
      await this.userNotificationRepository.getUserNotification(
        user,
        notificationId,
      );

    if (!userNotification) {
      throw new GrpcException({
        code: GrpcStatus.NOT_FOUND,
        httpError: new ForbiddenException('Notification not found'),
      });
    }

    const updatedUserNotification =
      await this.userNotificationRepository.updateNotificationStatus(
        user,
        notificationId,
        status,
      );

    return {
      status: updatedUserNotification.status,
    };
  }
}

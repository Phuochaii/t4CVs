import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, User_Notification } from '../entities';
import { SendNotificationRequest } from '@app/common/proto/notification';
import { PaginationRequest } from '@app/common';
@Injectable()
export class NotificationServiceService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User_Notification)
    private userNotificationRepository: Repository<User_Notification>,
  ) {}

  async createNotification(createRequest: SendNotificationRequest) {
    const notification = this.notificationRepository.create(createRequest);
    const savedNotification =
      await this.notificationRepository.save(notification);
    const userNotifications = createRequest.users.map((user) => {
      return this.userNotificationRepository.create({
        notification: savedNotification,
        userId: user.id,
      });
    });
    await this.userNotificationRepository.save(userNotifications);
  }

  async getNotifications(
    userId: User_Notification['userId'],
    paginationRequest: PaginationRequest,
  ): Promise<User_Notification[]> {
    return await this.userNotificationRepository.find({
      where: {
        userId,
      },
      relations: ['notification'],
      take: paginationRequest.limit,
      skip: paginationRequest.offset,
      order: {
        notification: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async getTotalNotifications(
    userId: User_Notification['userId'],
  ): Promise<number> {
    return await this.userNotificationRepository.count({
      where: {
        userId,
      },
    });
  }

  async updateNotificationStatus(
    userId: User_Notification['userId'],
    notificationId: User_Notification['notificationId'],
    status: User_Notification['status'],
  ) {
    const toBeUpdate = this.userNotificationRepository.create({
      userId,
      notificationId,
      status: status,
    });
    const savedUserNotification =
      await this.userNotificationRepository.save(toBeUpdate);

    return savedUserNotification;
  }
}

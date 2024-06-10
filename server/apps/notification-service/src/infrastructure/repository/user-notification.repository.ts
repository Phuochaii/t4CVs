import { PaginationRequest } from '@app/common/dto/pagination';
import {
  NotificationStatus,
  UserNotificationAggregate,
} from '../../domain/aggregate';
import { Notification, User } from '../../domain/entity';
import { UserNotificationRepository } from '../../domain/repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotificationSchema } from '../schema';
import { UserNotificationSchemaMapper } from '../mapper';

export class TypeOrmUserNotificationRepository extends UserNotificationRepository {
  constructor(
    @InjectRepository(UserNotificationSchema)
    private readonly userNotificationRepository: Repository<UserNotificationSchema>,
  ) {
    super();
  }

  async getUserNotification(
    user: User,
    notificationId: Notification['id'],
  ): Promise<UserNotificationAggregate | null> {
    const query: UserNotificationSchema | null =
      await this.userNotificationRepository.findOne({
        where: {
          userId: user.id,
          notificationId,
        },
        relations: ['notification'],
      });
    if (!query) {
      return null;
    }
    return new UserNotificationSchemaMapper().toDomain(query);
  }

  async getUserNotificationsWithPagination(
    user: User,
    pagination: PaginationRequest,
  ): Promise<UserNotificationAggregate[]> {
    const query = await this.userNotificationRepository.find({
      where: {
        userId: user.id,
      },
      relations: ['notification'],
      take: pagination.limit,
      skip: pagination.offset,
      order: {
        notification: {
          createdAt: 'DESC',
        },
      },
    });
    return query.map((notification) => {
      return new UserNotificationSchemaMapper().toDomain(notification);
    });
  }

  async getTotalNotifications(user: User): Promise<number> {
    return await this.userNotificationRepository.count({
      where: {
        userId: user.id,
      },
    });
  }

  async createUserNotifications(
    users: User[],
    notification: Notification,
  ): Promise<UserNotificationAggregate[]> {
    const userNotifications = users.map((user) => {
      return this.userNotificationRepository.create({
        notificationId: notification.id,
        userId: user.id,
      });
    });
    await this.userNotificationRepository.save(userNotifications);
    const savedUserNotifications = await this.userNotificationRepository.find({
      where: {
        notificationId: notification.id,
      },
      relations: ['notification'],
    });
    return savedUserNotifications.map((userNotification) => {
      return new UserNotificationSchemaMapper().toDomain(userNotification);
    });
  }

  async updateNotificationStatus(
    user: User,
    notificationId: Notification['id'],
    status: NotificationStatus,
  ): Promise<UserNotificationAggregate> {
    const toBeUpdated = this.userNotificationRepository.create({
      userId: user.id,
      notificationId,
      status,
    });
    const updatedUserNotification =
      await this.userNotificationRepository.save(toBeUpdated);
    const savedUserNotification = await this.getUserNotification(
      user,
      notificationId,
    );
    return savedUserNotification;
  }
}

import { BaseService } from './base.service';
import { NotificationRepository, UserNotificationRepository } from '../repository';
import { Notification } from '../entity';
import { CreateNotificationDto } from '../dto';

export class CreateNotificationService implements BaseService<Notification> {
    constructor(
        private readonly notificationRepository: NotificationRepository,
        private readonly userNotificationRepository: UserNotificationRepository
    ) { }

    async execute(
        {
            users,
            notification
        }: CreateNotificationDto
    ): Promise<Notification> {
        const createdNotification = await this.notificationRepository.createNotification(notification);
        const userNotifications = await this.userNotificationRepository.createUserNotifications(
            users,
            createdNotification
        );
        return createdNotification;
    }
}
import { PaginationRequest } from "@app/common/dto/pagination";
import { UserNotificationAggregate } from "../aggregate";
import { Notification, User } from "../entity";

export abstract class UserNotificationRepository {
    abstract getUserNotificationsWithPagination(
        user: User,
        pagination: PaginationRequest
    ): Promise<UserNotificationAggregate[]>;

    abstract getTotalNotifications(user: User): Promise<number>;
    abstract createUserNotifications(
        users: User[],
        notification: Notification
    ): Promise<UserNotificationAggregate[]>;
    abstract getUserNotification(
        user: User,
        notificationId: Notification['id']
    ): Promise<null | UserNotificationAggregate>;
    abstract updateNotificationStatus(
        user: User,
        notificationId: Notification['id'],
        status: UserNotificationAggregate['status']
    ): Promise<UserNotificationAggregate>;
}
import { Notification, User } from "../entity";

export enum NotificationStatus {
    UNREAD = 0,
    READ = 1,
}

export class UserNotificationAggregate {
    user: User;
    notification: Notification;
    status: NotificationStatus;
}
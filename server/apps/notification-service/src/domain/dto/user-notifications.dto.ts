import { Notification } from "../entity"
import { NotificationStatus, UserNotificationAggregate } from "../aggregate"

export class UserNotificationsDTO implements Notification, Pick<UserNotificationAggregate, 'status'> {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    link: string;
    status: NotificationStatus;
}
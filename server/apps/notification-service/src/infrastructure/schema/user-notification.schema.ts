import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { NotificationStatus, UserNotificationAggregate } from "../../domain/aggregate";
import { Notification } from "./notification.schema";

interface _ extends Omit<UserNotificationAggregate, "notication" | 'user'> {
    notificationId: number;
    userId: string;
}

@Entity('user_notification')
export class UserNotification implements _ {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    notificationId: number;

    @ManyToOne(() => Notification, { eager: true })
    @JoinColumn({ name: 'notificationId' })
    notification: Notification;

    @Column('enum', {
        enum: NotificationStatus,
        default: NotificationStatus.UNREAD,
    })
    status: NotificationStatus;
}
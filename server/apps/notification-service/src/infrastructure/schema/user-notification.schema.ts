import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { NotificationStatus, UserNotificationAggregate } from "../../domain/aggregate";
import { NotificationSchema } from "./notification.schema";

interface _ extends Omit<UserNotificationAggregate, "notication" | 'user'> {
    notificationId: number;
    userId: string;
}

@Entity('user_notification')
export class UserNotificationSchema implements _ {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    notificationId: number;

    @ManyToOne(() => NotificationSchema, { eager: true })
    @JoinColumn({ name: 'notificationId' })
    notification: NotificationSchema;

    @Column('enum', {
        enum: NotificationStatus,
        default: NotificationStatus.UNREAD,
    })
    status: NotificationStatus;
}
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { NotificationStatus, UserNotificationAggregate } from "../../../aggregate";
import { NotificationEntity } from "./notification.schema";

interface _ extends Omit<UserNotificationAggregate, "notication" | 'user'> {
    notificationId: number;
    userId: string;
}

@Entity('user_notification')
export class UserNotificationEntity implements _ {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    notificationId: number;

    @ManyToOne(() => NotificationEntity, { eager: true })
    @JoinColumn({ name: 'notificationId' })
    notification: NotificationEntity;

    @Column('enum', {
        enum: NotificationStatus,
        default: NotificationStatus.UNREAD,
    })
    status: NotificationStatus;
}
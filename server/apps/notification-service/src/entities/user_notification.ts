import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Notification } from "./notification";

enum NotificationStatus {
    READ = 0,
    UNREAD = 1
}

@Entity()
export class User_Notification {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    notificationId: number;

    @ManyToOne(() => Notification)
    @JoinColumn({ name: 'notificationId' })
    notification: Notification;

    @Column("enum", { enum: NotificationStatus, default: NotificationStatus.UNREAD })
    status: NotificationStatus;
}
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Notification } from "./notification";

enum NotificationStatus {
    READ = 0,
    UNREAD = 1
}

@Entity()
export class User_Notification{
    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => Notification)
    notification: number;

    @Column("enum", { enum: NotificationStatus })
    status: NotificationStatus;
}
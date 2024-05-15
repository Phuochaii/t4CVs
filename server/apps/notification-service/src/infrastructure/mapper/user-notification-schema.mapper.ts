import { UserNotificationAggregate } from "../../domain/aggregate";
import { UserNotificationSchema } from "../schema";
import { Mapper } from "./base.mapper";

export class UserNotificationSchemaMapper implements Mapper<UserNotificationAggregate, UserNotificationSchema> {
    toDomain(schema: UserNotificationSchema): UserNotificationAggregate {
        return {
            user: {
                id: schema.userId,
            },
            notification: {
                id: schema.notification.id,
                title: schema.notification.title,
                content: schema.notification.content,
                createdAt: schema.notification.createdAt,
                link: schema.notification.link,
            },
            status: schema.status,
        };
    }

    toSchema(domain: UserNotificationAggregate): UserNotificationSchema {
        return {
            userId: domain.user.id,
            notificationId: domain.notification.id,
            notification: {
                id: domain.notification.id,
                title: domain.notification.title,
                content: domain.notification.content,
                createdAt: domain.notification.createdAt,
                link: domain.notification.link,
            },
            status: domain.status,
        };
    }
}
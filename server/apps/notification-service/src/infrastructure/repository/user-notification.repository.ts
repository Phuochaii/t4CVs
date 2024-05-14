import { PaginationRequest } from "@app/common/dto/pagination";
import { UserNotificationAggregate } from "../../domain/aggregate";
import { Notification, User } from "../../domain/entity";
import { UserNotificationRepository } from "../../domain/repository";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotificationSchema } from "../schema";
import { UserNotificationSchemaMapper } from "../mapper";

export class TypeOrmUserNotificationRepository extends UserNotificationRepository {
    constructor(
        @InjectRepository(UserNotificationSchema)
        private readonly userNotificationRepository: Repository<UserNotificationSchema>
    ) {
        super();
    }
    async getUserNotificationsWithPagination(
        user: User,
        pagination: PaginationRequest
    ): Promise<UserNotificationAggregate[]> {
        const query = await this.userNotificationRepository.find({
            where: {
                userId: user.id,
            },
            relations: ['notification'],
            take: pagination.limit,
            skip: pagination.offset,
            order: {
                notification: {
                    createdAt: 'DESC',
                },
            },
        });
        return query.map((notification) => {
            return new UserNotificationSchemaMapper().toDomain(notification);
        })
    }
    async getTotalNotifications(user: User): Promise<number> {
        return await this.userNotificationRepository.count({
            where: {
                userId: user.id,
            },
        });
    }

    async createUserNotifications(
        users: User[],
        notification: Notification
    ): Promise<UserNotificationAggregate[]> {
        const userNotifications = users.map((user) => {
            return this.userNotificationRepository.create({
                notificationId: notification.id,
                userId: user.id,
            });
        });
        await this.userNotificationRepository.save(userNotifications);
        const savedUserNotifications = await this.userNotificationRepository.find({
            where: {
                notificationId: notification.id,
            },
            relations: ['notification'],
        });
        return savedUserNotifications.map((userNotification) => {
            return new UserNotificationSchemaMapper().toDomain(userNotification);
        });
    }
}
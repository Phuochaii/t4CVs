import { PaginationRequest } from "@app/common/dto/pagination";
import { UserNotificationAggregate } from "../../domain/aggregate";
import { User } from "../../domain/entity";
import { UserNotificationRepository } from "../../domain/repository";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotification } from "../schema";
import { UserNotificationSchemaMapper } from "../mapper";

export class TypeOrmUserNotificationRepository extends UserNotificationRepository {
    constructor(
        @InjectRepository(UserNotification)
        private readonly userNotificationRepository: Repository<UserNotification>
    ) {
        super();
    }
    async getUserNotificationsWithPagination(user: User, pagination: PaginationRequest): Promise<UserNotificationAggregate[]> {
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

}
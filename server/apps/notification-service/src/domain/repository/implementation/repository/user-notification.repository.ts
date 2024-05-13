import { PaginationRequest } from "@app/common";
import { UserNotificationAggregate } from "../../../aggregate";
import { User } from "../../../entity";
import { UserNotificationRepository } from "../../interface";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotificationEntity } from "../schema";
import { UserNotificationSchemaMapper } from "../mapper";

export class UserNotificationRepositoryImp extends UserNotificationRepository {
    constructor(
        @InjectRepository(UserNotificationEntity)
        private readonly userNotificationRepository: Repository<UserNotificationEntity>
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
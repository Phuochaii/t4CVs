import { InjectRepository } from "@nestjs/typeorm";
import { NotificationRepository } from "../../domain/repository";
import { NotificationSchema } from "../schema"
import { Repository } from "typeorm";
import { NotificationDto } from "../../domain/dto";
import { Notification } from "../../domain/entity";

export class TypeOrmNotificationRepository extends NotificationRepository {

    constructor(
        @InjectRepository(NotificationSchema)
        private readonly notificationRepository: Repository<NotificationSchema>
    ) {
        super();
    }

    async createNotification(
        notification: NotificationDto
    ): Promise<Notification> {
        return await this.notificationRepository.save(notification);
    }

}
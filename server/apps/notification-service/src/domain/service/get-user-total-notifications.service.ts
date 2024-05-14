import { User } from "../entity";
import { UserNotificationRepository } from "../repository";
import { BaseService } from "./base.service";


export class GetUserTotalNotificationsService implements BaseService<number> {
    
    constructor(private readonly userNotificationRepository: UserNotificationRepository) { 
    }

    async execute(user: User): Promise<number> {
        return await this.userNotificationRepository.getTotalNotifications(user);
    }
}
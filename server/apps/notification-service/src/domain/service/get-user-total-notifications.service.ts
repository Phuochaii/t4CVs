import { Injectable } from "@nestjs/common";
import { User } from "../entity";
import { UserNotificationRepository } from "../repository/interface";
import { BaseService } from "./base.service";

@Injectable()
export class GetUserTotalNotificationsService implements BaseService<number> {
    constructor(private readonly userNotificationRepository: UserNotificationRepository) { 
        console.log('GetUserTotalNotificationsService created');
    }

    async execute(user: User): Promise<number> {
        return this.userNotificationRepository.getTotalNotifications(user);
    }
}
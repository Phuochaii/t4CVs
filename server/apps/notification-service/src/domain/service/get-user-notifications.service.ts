import { PaginationRequest } from "@app/common";
import { UserNotificationAggregate } from "../aggregate";
import { GetUserNotificationsDto } from "../dto";
import { BaseService } from "./base.service";
import { UserNotificationRepository } from "../repository/interface/user-notification.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetUserNotificationsService implements BaseService<UserNotificationAggregate[]> {
    constructor(
        private readonly userNotificationRepository: UserNotificationRepository
    ) { }

    async execute(
        {
            user,
            paginationRequest = new PaginationRequest({ page: 1, limit: 10 })
        }: GetUserNotificationsDto
    ): Promise<UserNotificationAggregate[]> {
        const userNotifications = await this.userNotificationRepository
            .getUserNotificationsWithPagination(user, paginationRequest);
        return userNotifications;
    }
}
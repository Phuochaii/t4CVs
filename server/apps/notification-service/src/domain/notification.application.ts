import { PaginationRequest, PaginationResponse } from "@app/common";
import { GetUserNotificationsDto, UserNotificationsDTO } from "./dto";
import { GetUserNotificationsService, GetUserTotalNotificationsService } from "./service";
import { UserNotificationAggregate } from "./aggregate";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationApplication {
    constructor(
        private readonly getUserNotification: GetUserNotificationsService,
        private readonly getUserTotalNotification: GetUserTotalNotificationsService
    ) { }
    async getNotifications(
        {
            user,
            paginationRequest = new PaginationRequest({ page: 1, limit: 10 })
        }: GetUserNotificationsDto
    ): Promise<PaginationResponse<UserNotificationsDTO>> {
        const total = await this.getUserTotalNotification.execute(user);
        const userNotifications = await this.getUserNotification.execute({ user, paginationRequest });

        return new PaginationResponse<UserNotificationsDTO>({
            data: userNotifications.map((userNotification: UserNotificationAggregate) => {
                const notification = userNotification.notification;
                return {
                    id: notification.id,
                    title: notification.title,
                    content: notification.content,
                    createdAt: notification.createdAt,
                    link: notification.link,
                    status: userNotification.status
                };
            }),
            total,
            pageRequest: paginationRequest
        });
    }
}
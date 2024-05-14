import { PaginationRequest, PaginationResponse } from "@app/common/dto/pagination";
import { CreateNotificationDto, GetUserNotificationsDto, UpdateNotificationStatusDto, UpdateNotificationStatusResponseDto, UserNotificationsDTO } from "./dto";
import { CreateNotificationService, GetUserNotificationsService, GetUserTotalNotificationsService, UpdateNotificationStatusService } from "./service";
import { UserNotificationAggregate } from "./aggregate";
import { Notification } from "./entity";

export class NotificationApplication {
    constructor(
        private readonly getUserNotification: GetUserNotificationsService,
        private readonly getUserTotalNotification: GetUserTotalNotificationsService,
        private readonly createNotificationService: CreateNotificationService,
        private readonly updateNotificationStatusService: UpdateNotificationStatusService
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

    async createNotification(
        request: CreateNotificationDto
    ): Promise<Notification> {
        return await this.createNotificationService.execute(request);
    }

    async updateNotificationStatus(
        request: UpdateNotificationStatusDto
    ): Promise<UpdateNotificationStatusResponseDto> {
        return await this.updateNotificationStatusService.execute({
            notificationId: request.notificationId,
            status: request.status,
            user: request.user
        });
    }
}
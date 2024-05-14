import { UpdateNotificationStatusDto, UpdateNotificationStatusResponseDto } from "../dto";
import { UserNotificationRepository } from "../repository";
import { BaseService } from "./base.service"

export class UpdateNotificationStatusService
    implements BaseService<UpdateNotificationStatusResponseDto> {

    constructor(
        private readonly userNotificationRepository: UserNotificationRepository
    ) { }

    async execute({
        notificationId,
        status,
        user
    }: UpdateNotificationStatusDto): Promise<UpdateNotificationStatusResponseDto> {
        const updatedUserNotification = await this.userNotificationRepository.updateNotificationStatus(
            user,
            notificationId,
            status
        );
        return {
            status: updatedUserNotification.status
        };
    }
}
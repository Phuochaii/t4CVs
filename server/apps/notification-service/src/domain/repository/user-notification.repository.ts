import { PaginationRequest } from "@app/common/dto/pagination";
import { UserNotificationAggregate } from "../aggregate";
import { User } from "../entity";

export abstract class UserNotificationRepository {
    abstract getUserNotificationsWithPagination(
        user: User,
        pagination: PaginationRequest
    ): Promise<UserNotificationAggregate[]>;

    abstract getTotalNotifications(user: User): Promise<number>;
}
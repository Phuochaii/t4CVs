import { PaginationRequest } from "@app/common";
import { User } from "../entity/user.entity";

export class GetUserNotificationsDto {
    user: User;
    paginationRequest?: PaginationRequest;
}
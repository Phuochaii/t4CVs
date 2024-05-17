import { PaginationRequest } from "@app/common/dto/pagination";
import { User } from "../entity/user.entity";

export class GetUserNotificationsDto {
    user: User;
    paginationRequest?: PaginationRequest;
}
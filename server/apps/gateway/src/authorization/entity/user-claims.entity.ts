import { Permission } from "../permission";

export class UserClaims {
    sub: string;
    permissions: Permission[];
}
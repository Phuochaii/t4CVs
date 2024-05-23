import { AUTH0_REALM } from "../../config";
import { SocialLoginUseCase } from "./base.usecase";

export class LinkedInLoginUsecase extends SocialLoginUseCase {
    constructor() {
        super(AUTH0_REALM.LinkedIn);
    }
}
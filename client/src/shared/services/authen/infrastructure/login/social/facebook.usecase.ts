import { AUTH0_REALM } from "../../../config";
import { SocialLoginUseCase } from "./base.usecase";

export class FaceBookLoginUseCase extends SocialLoginUseCase {
  constructor() {
    super(AUTH0_REALM.Facebook);
  }
}
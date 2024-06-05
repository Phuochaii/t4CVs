import { AuthenUseCase, RegisterCredentials, SocialLogin, UsernamePasswordLoginCredentials } from "../domain";
import { Role } from "../domain/context";
import { FaceBookLoginUseCase, GoogleLoginUseCase, LinkedInLoginUsecase, UsernamePasswordLoginUseCase } from "./login";
import { RegisterUseCase } from "./register";

export class Auth0UseCase implements AuthenUseCase {
    constructor() { }

    usernamePasswordLogin(
        credentials: UsernamePasswordLoginCredentials,
        role: Role,
        errorCallback?: (errMessage: string) => void
    ) {
        new UsernamePasswordLoginUseCase(credentials, role, errorCallback).call();
    }

    googleLogin() {
        new GoogleLoginUseCase().call();
    }

    linkedInLogin: SocialLogin = () => {
        new LinkedInLoginUsecase().call();
    }

    facebookLogin: SocialLogin = () => {
        new FaceBookLoginUseCase().call();
    }

    register(credentials: RegisterCredentials, role: Role) {
        new RegisterUseCase(credentials, role).call();
    }

}
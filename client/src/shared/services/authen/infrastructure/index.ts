import { AuthenUseCase, RegisterCredentials, SocialLogin, UsernamePasswordLoginCredentials } from "../domain";
import { FaceBookLoginUseCase, GoogleLoginUseCase, LinkedInLoginUsecase, UsernamePasswordLoginUseCase } from "./login";
import { RegisterUseCase } from "./register";

export class Auth0UseCase implements AuthenUseCase {
    constructor() { }

    usernamePasswordLogin(credentials: UsernamePasswordLoginCredentials) {
        new UsernamePasswordLoginUseCase(credentials).call();
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

    register(credentials: RegisterCredentials) {
        new RegisterUseCase(credentials).call();
    }

}
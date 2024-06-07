import { Role } from "./context";

/// Domain
export interface UsernamePasswordLoginCredentials {
  username: string,
  password: string,
}
export interface RegisterCredentials extends UsernamePasswordLoginCredentials {
  fullname: string,
}
export type SocialLogin = () => void;
export interface AuthenUseCase {
  usernamePasswordLogin: (credentials: UsernamePasswordLoginCredentials, role: Role, errorCallback?: (errMessage: string) => void) => void;
  googleLogin: SocialLogin;
  linkedInLogin: SocialLogin;
  facebookLogin: SocialLogin;
  register: (credentials: RegisterCredentials, role: Role) => void;
}

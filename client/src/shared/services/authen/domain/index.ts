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
  usernamePasswordLogin: (credentials: UsernamePasswordLoginCredentials) => void;
  googleLogin: SocialLogin;
  linkedInLogin: SocialLogin;
  register: (credentials: RegisterCredentials) => void;
}

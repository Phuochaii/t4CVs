export const AUTH0_DOMAIN = 'dev-0oh0fi1avbej1681.us.auth0.com';
export const AUTH0_CLIENT_ID = 'NXdIWANcMLVivHz2A3ANsPHLYVvCAgd1';
export const AUTH0_LOGIN_REDIRECT_URL = 'http://localhost:5173';
export enum AUTH0_REALM{
    UsernamePassword = 'Username-Password-Authentication',
    Google = 'google-oauth2',
    Facebook = 'facebook',
    LinkedIn = 'linkedin',
} ;
export const AUTH0_SCOPE = 'openid email profile offline_access';
export const AUTH0_LOGIN_RESPONSE_TYPE = 'code';
export const AUTH0_LOGOUT_URL = 'http://localhost:5173';
export const AUTH0_BACKEND_AUDIENCE = 'http://localhost:300/';

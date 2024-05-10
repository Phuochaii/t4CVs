import { AUTH0_REALM } from "../../../config";
import { Auth0LoginUseCase, LoginCallCredentials } from "../base.usecase";

export class SocialLoginUseCase extends Auth0LoginUseCase {
  constructor(
    realm: AUTH0_REALM,
  ) {
    super(realm);
  }
  authLoginCall(credentials: LoginCallCredentials) {
    const { realm, transaction, auth, auht0Config } = credentials;
    auth.authorize({
      connection: realm,
      redirectUri: transaction.redirect_uri,
      responseType: auht0Config.responseType,
      state: transaction.state,
      nonce: transaction.nonce,
      scope: transaction.scope,
    });
  }
}
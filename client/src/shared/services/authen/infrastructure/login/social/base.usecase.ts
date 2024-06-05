import { AUTH0_REALM } from "../../config";
import { Auth0OperationUseCase, Auth0CallCredentials } from "../../base.usecase";

export class SocialLoginUseCase extends Auth0OperationUseCase {
  constructor(
    realm: AUTH0_REALM,
  ) {
    super(realm);
  }
  auth0Call(credentials: Auth0CallCredentials) {
    const { realm, transaction, auth, auht0Config } = credentials;
    auth.authorize({
      connection: realm,
      redirectUri: transaction.redirect_uri,
      responseType: auht0Config.responseType,
      state: transaction.state,
      nonce: transaction.nonce,
      scope: transaction.scope,
      audience: auht0Config.audience,
    });
  }
}
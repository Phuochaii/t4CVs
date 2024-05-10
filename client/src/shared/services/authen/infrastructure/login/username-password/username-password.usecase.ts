import { AUTH0_REALM } from "../../../config";
import { UsernamePasswordLoginCredentials } from "../../../domain";
import { Auth0LoginUseCase, LoginCallCredentials } from "../base.usecase";

export class UsernamePasswordLoginUseCase extends Auth0LoginUseCase {
    constructor(
        private credentials: UsernamePasswordLoginCredentials
    ) {
        super(AUTH0_REALM.UsernamePassword);
    }

    authLoginCall(credentials: LoginCallCredentials) {
        const { realm, transaction, auth, auht0Config } = credentials;
        const { username, password } = this.credentials;
        auth.login({
            realm: realm,
            username: username,
            password: password,
            redirectUri: transaction.redirect_uri,
            responseType: auht0Config.responseType,
            state: transaction.state,
            nonce: transaction.nonce,
            scope: transaction.scope,
        }, (err, authResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("authResult:", authResult);
        });
    }
}
import { AUTH0_BACKEND_AUDIENCE, AUTH0_REALM } from "../../config";
import { UsernamePasswordLoginCredentials } from "../../../domain";
import { Auth0OperationUseCase, Auth0CallCredentials } from "../../base.usecase";
import { Role } from "../../../domain/context";
import { Auth0Error } from "auth0-js";

export class UsernamePasswordLoginUseCase extends Auth0OperationUseCase {
    constructor(
        private credentials: UsernamePasswordLoginCredentials,
        private role: Role,
        private errorCallback?: (errMessage: string) => void
    ) {
        super(AUTH0_REALM.UsernamePassword);
    }

    auth0Call(credentials: Auth0CallCredentials) {
        const { realm, transaction, auth, auht0Config } = credentials;
        const { username, password } = this.credentials;
        auth.login({
            realm: realm,
            username: username,
            password: password,
            redirectUri: `http://localhost:5173${this.role.redirectUrl}`,
            responseType: auht0Config.responseType,
            state: transaction.state,
            nonce: transaction.nonce,
            scope: transaction.scope,
            audience: auht0Config.audience,
        }, (err, authResult) => {
            this.errorCallback?.(err?.description || "Tên tài khoản hoặc mật khẩu không chính xác.");
        });
    }
}
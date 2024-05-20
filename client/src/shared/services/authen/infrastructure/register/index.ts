import { RegisterCredentials } from './../../domain/index';
import { AUTH0_REALM } from '../config';
import { Auth0OperationUseCase, Auth0CallCredentials } from '../base.usecase';
import { UsernamePasswordLoginUseCase } from '../login';
import { Role } from '../../domain/context';
export class RegisterUseCase extends Auth0OperationUseCase {
    constructor(
        private credentials: RegisterCredentials,
        role: Role,
        private usernamePasswordLogin: UsernamePasswordLoginUseCase
            = new UsernamePasswordLoginUseCase(credentials, role),
    ) {
        super(AUTH0_REALM.UsernamePassword);
    }
    auth0Call(credentials: Auth0CallCredentials): void {
        const { realm, transaction, auth, auht0Config } = credentials;
        const { username, password, fullname } = this.credentials;
        return auth.signup({
            connection: realm,
            email: username,
            password: password,
            scope: transaction.scope,
        }, (err, authResult) => {
            if (err) {
                throw err;
            }
            this.usernamePasswordLogin.call();
        });
    }
}
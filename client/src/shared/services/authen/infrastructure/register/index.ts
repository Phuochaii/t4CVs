import { RegisterCredentials } from './../../domain/index';
import { AUTH0_REALM } from '../config';
import { Auth0OperationUseCase, Auth0CallCredentials } from '../base.usecase';
import { UsernamePasswordLoginUseCase } from '../login';
import { Role } from '../../domain/context';
import axios from 'axios';
export class RegisterUseCase extends Auth0OperationUseCase {
    constructor(
        private credentials: RegisterCredentials,
        private role: Role,
        private usernamePasswordLogin: UsernamePasswordLoginUseCase
            = new UsernamePasswordLoginUseCase(credentials, role),
    ) {
        super(AUTH0_REALM.UsernamePassword);
    }

    auth0Call(credentials: Auth0CallCredentials): void {
        axios.post(this.role.registerApiUrl, {
            email: this.credentials.username,
            password: this.credentials.password,
            fullname: this.credentials.fullname,
        }).then(() => {
            this.usernamePasswordLogin.call()
        }).catch((error) => {
            alert('Register failed');
            console.log(error);
        });
    }
}
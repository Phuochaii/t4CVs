import { WebAuth } from 'auth0-js';
import {
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_SCOPE,
  AUTH0_LOGIN_RESPONSE_TYPE,
  AUTH0_REALM,
  AUTH0_LOGIN_REDIRECT_URL,
} from './config.ts';


interface Transaction {
  state: string,
  nonce: string,
  code_verifier: string,
  scope: string,
  audience: string,
  redirect_uri: string,
}

const generateHash = (): string => {
  const hash = btoa(Math.random().toString(36).slice(2, 10));
  return hash;
}

const generateTransaction = (): Transaction => {
  const state = generateHash();
  const nonce = generateHash();
  const code_verifier = generateHash();
  return {
    state,
    nonce,
    code_verifier,
    audience: 'default',
    redirect_uri: AUTH0_LOGIN_REDIRECT_URL,
    scope: AUTH0_SCOPE
  }
}

const getAuth0TransactionKey = (transation: Transaction): string => {
  return `a0.spajs.txs.${AUTH0_CLIENT_ID}`;
}

const setAuth0Transaction = (transation: Transaction) => {
  const key = getAuth0TransactionKey(transation);
  const data = transation;
  sessionStorage.setItem(key, JSON.stringify(data));
}

interface Auth0Config {
  redirectUri: string,
  responseType: string,
}

interface LoginCallCredentials {
  realm: AUTH0_REALM,
  auht0Config: Auth0Config,
  transaction: Transaction,
  auth: WebAuth
}

abstract class Auth0LoginUseCase {
  constructor(
    private realm: AUTH0_REALM,
    private auth: WebAuth = new WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      scope: AUTH0_SCOPE,
      response_type: AUTH0_LOGIN_RESPONSE_TYPE,
    }),
    private config: Auth0Config = {
      redirectUri: AUTH0_LOGIN_REDIRECT_URL,
      responseType: AUTH0_LOGIN_RESPONSE_TYPE,
    }
  ) { }

  initLoginTransaction() {
    const transaction = generateTransaction();
    setAuth0Transaction(transaction);
    return transaction;
  }

  abstract authLoginCall(
    credentials: LoginCallCredentials
  ): void;

  login() {
    const transaction = this.initLoginTransaction();
    this.authLoginCall({
      auht0Config: this.config,
      realm: this.realm,
      transaction,
      auth: this.auth,
    });
  }
}

class UsernamePasswordLoginUseCase extends Auth0LoginUseCase {
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

class GoogleLoginUseCase extends Auth0LoginUseCase {
  constructor() {
    super(AUTH0_REALM.Google);
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



/// Domain
interface UsernamePasswordLoginCredentials {
  username: string,
  password: string,
}
interface RegisterCredentials extends UsernamePasswordLoginCredentials {
  fullname: string,
}
interface AuthenUseCase {
  usernamePasswordLogin: (credentials: UsernamePasswordLoginCredentials) => void;
  googleLogin: () => void;
  register: (credentials: RegisterCredentials) => void;
}

// infrastructure
class Auth0UseCase implements AuthenUseCase {
  constructor() { }

  usernamePasswordLogin(credentials: UsernamePasswordLoginCredentials) {
    new UsernamePasswordLoginUseCase(credentials).login();
  }

  googleLogin() {
    new GoogleLoginUseCase().login();
  }

  register(credentials: RegisterCredentials) {
    throw new Error('Not implemented');
  }
}
export const useAuthen = (): AuthenUseCase => {
  return new Auth0UseCase();
};
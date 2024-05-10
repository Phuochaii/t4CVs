import { WebAuth } from 'auth0-js';
import {
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_SCOPE,
  AUTH0_LOGIN_RESPONSE_TYPE,
  AUTH0_REALM,
  AUTH0_LOGIN_REDIRECT_URL,
} from './config.ts';

export const auth = new WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  scope: AUTH0_SCOPE,
  response_type: AUTH0_LOGIN_RESPONSE_TYPE,
});

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

interface LoginCredentials {
  username: string,
  password: string,
}
interface RegisterCredentials extends LoginCredentials {
  fullname: string,
}
export interface AuthenUseCase {
  login: (credentials : LoginCredentials) => void;
  register: (credentials: RegisterCredentials) => void;
}

const login = (credentials: LoginCredentials) => {
  const { username, password } = credentials;

  const transaction = generateTransaction();
  setAuth0Transaction(transaction);
  auth.login({
    realm: AUTH0_REALM,
    username: username,
    password: password,
    redirectUri: transaction.redirect_uri,
    responseType: AUTH0_LOGIN_RESPONSE_TYPE,
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
};

const register = (credentials: RegisterCredentials) => {
  throw new Error('Not implemented');
}

export const useAuthen = (): AuthenUseCase => {
  return {
    login,
    register,
  };
};
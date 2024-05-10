import { WebAuth } from "auth0-js";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_LOGIN_REDIRECT_URL, AUTH0_LOGIN_RESPONSE_TYPE, AUTH0_REALM, AUTH0_SCOPE } from "./config";

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

export interface Auth0CallCredentials {
    realm: AUTH0_REALM,
    auht0Config: Auth0Config,
    transaction: Transaction,
    auth: WebAuth
}

export abstract class Auth0OperationUseCase {
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

    abstract auth0Call(
        credentials: Auth0CallCredentials
    ): void;

    call() {
        const transaction = this.initLoginTransaction();
        this.auth0Call({
            auht0Config: this.config,
            realm: this.realm,
            transaction,
            auth: this.auth,
        });
    }
}
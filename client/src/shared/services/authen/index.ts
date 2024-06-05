import { AuthenUseCase } from "./domain";
import { Auth0UseCase } from "./infrastructure";

export const useAuthen = (): AuthenUseCase => {
    return new Auth0UseCase();
};
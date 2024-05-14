export interface BaseService<ReturnType> {
    execute(...args: any[]): Promise<ReturnType>;
}
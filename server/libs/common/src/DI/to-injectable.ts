const createFactory = <T>(
    constructor: new (...args: any[]) => T
) => {
    return (...injects: any[]) => {
        return new constructor(...injects);
    };
}

interface CreateProviderInputs {
    dependencies: any[];
    domainClass: new (...args: any[]) => any;
}
export const createProvider = <T>(
    {
        dependencies,
        domainClass: constructor,
    }: CreateProviderInputs
) => {
    return {
        provide: constructor,
        useFactory: createFactory(constructor),
        inject: dependencies,
    };
}
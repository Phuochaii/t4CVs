import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

const DB_NOT_EXIST_ERROR_CODE = '3D000';
const defaultConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'notification',
    autoLoadEntities: true,
    synchronize: true,
};

const createDatabase = async (name: string) => {
    const postgresDBConnectOption = {
        ...defaultConfig,
        database: 'postgres'
    }
    const appDataSource = await new DataSource(
        postgresDBConnectOption as DataSourceOptions
    ).initialize();
    await appDataSource.query(`CREATE DATABASE ${name};`);
    await appDataSource.destroy();
}

const isDatabaseExist = async (name: string) => {
    try {
        const dataSourceOption = {
            ...defaultConfig,
            database: name
        } as DataSourceOptions;

        const appDataSource = await new DataSource(
            dataSourceOption
        ).initialize();

        await appDataSource.destroy();
    } catch (error) {
        if (error.code === DB_NOT_EXIST_ERROR_CODE) {
            return false;
        }
        else
            throw error;
    }
    return true;
}

const initDatabase = async () => {
    await createDatabase(defaultConfig.database);
}

export const databaseConfig: () => Promise<TypeOrmModuleOptions> = async () => {
    if (!(await isDatabaseExist(defaultConfig.database)))
        await initDatabase();

    return defaultConfig;
}

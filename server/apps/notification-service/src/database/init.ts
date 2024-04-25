import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { notifications, userNotifications } from './data'
import { Notification, User_Notification } from "../entities";

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

const doCallbackWithAutoCloseConnection = async (
    option: DataSourceOptions,
    callback: (dataSource: DataSource) => Promise<void>
) => {
    const appDataSource = await new DataSource(option).initialize();
    await callback(appDataSource);
    await appDataSource.destroy();
}

const createDatabase = async (name: string) => {
    const createDatabaseSQL = `CREATE DATABASE ${name};`;
    const createDatabase = async (dataSource: DataSource) => {
        await dataSource.query(createDatabaseSQL);
    }

    const postgresDBConnectOption = {
        ...defaultConfig,
        database: 'postgres'
    } as DataSourceOptions;
    await doCallbackWithAutoCloseConnection(
        postgresDBConnectOption,
        createDatabase
    );
}

const isDatabaseExist = async (name: string) => {
    try {
        const dataSourceOption = {
            ...defaultConfig,
            database: name
        } as DataSourceOptions;

        await doCallbackWithAutoCloseConnection(
            dataSourceOption,
            async () => { }
        );
    } catch (error) {
        if (error.code === DB_NOT_EXIST_ERROR_CODE) {
            return false;
        }
        else
            throw error;
    }
    return true;
}

const insertData = async () => {
    const option = {
        ...defaultConfig,
        entities: [Notification, User_Notification]
    } as DataSourceOptions;
    await doCallbackWithAutoCloseConnection(
        option,
        async (dataSource) => {
            await dataSource.getRepository(Notification).insert(notifications);
            await dataSource.getRepository(User_Notification).insert(userNotifications);
        }
    );
}

const initDatabase = async () => {
    await createDatabase(defaultConfig.database);
    await insertData();
}

export const databaseConfig: () => Promise<TypeOrmModuleOptions> = async () => {
    if (!(await isDatabaseExist(defaultConfig.database)))
        await initDatabase();

    return defaultConfig;
}

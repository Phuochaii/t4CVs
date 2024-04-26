import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Application } from '../entities/application.entity';
import { applications } from './data';
import { config } from 'dotenv';
import { resolve } from 'path';

const envPath = resolve(__dirname, '../../../configs/.env.application');
config({ path: envPath });

const DB_PORT = parseInt(process.env.DB_PORT, 10);
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

if (!DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_DATABASE) {
  throw new Error('Missing required environment variables');
}

const defaultConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
};

const doCallbackWithAutoCloseConnection = async (
  option: DataSourceOptions,
  callback: (dataSource: DataSource) => Promise<void>,
) => {
  const appDataSource = await new DataSource(option).initialize();
  await callback(appDataSource);
  await appDataSource.destroy();
};

const createDatabase = async (name: string) => {
  const postgresDBConnectOption = {
    ...defaultConfig,
    database: 'postgres',
  };
  const appDataSource = await new DataSource(
    postgresDBConnectOption as DataSourceOptions,
  ).initialize();
  await appDataSource.query(`CREATE DATABASE ${name};`);
  await appDataSource.destroy();
};

const isDatabaseExist = async (name: string) => {
  try {
    const dataSourceOption = {
      ...defaultConfig,
      database: name,
    } as DataSourceOptions;

    const appDataSource = await new DataSource(dataSourceOption).initialize();

    await appDataSource.destroy();
  } catch (error) {
    if (error.code === '3D000') {
      return false;
    } else throw error;
  }
  return true;
};

const insertData = async () => {
  const option = {
    ...defaultConfig,
    entities: [Application],
  } as DataSourceOptions;
  await doCallbackWithAutoCloseConnection(option, async (dataSource) => {
    await dataSource.getRepository(Application).insert(applications);
  });
};

const initDatabase = async () => {
  await createDatabase(defaultConfig.database);
  await insertData();
};

export const databaseConfig: () => Promise<TypeOrmModuleOptions> = async () => {
  if (!(await isDatabaseExist(defaultConfig.database))) await initDatabase();

  return defaultConfig;
};

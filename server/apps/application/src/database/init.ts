import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
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

const initDatabase = async () => {
  await createDatabase(defaultConfig.database);
};

export const databaseConfig: () => Promise<TypeOrmModuleOptions> = async () => {
  if (!(await isDatabaseExist(defaultConfig.database))) await initDatabase();

  return defaultConfig;
};

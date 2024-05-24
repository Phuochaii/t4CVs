import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Currency } from '../infrastructure/schemas/currency.schema';
import { Experience } from '../infrastructure/schemas/experience.schema';
import { Field } from '../infrastructure/schemas/field.schema';
import { Level } from '../infrastructure/schemas/level.schema';
import { Location } from '../infrastructure/schemas/location.schema';
import { Major } from '../infrastructure/schemas/major.schema';
import { Type } from '../infrastructure/schemas/type.schema';
import { Job } from '../infrastructure/schemas/job.schema';
import { JobDetail } from '../infrastructure/schemas/job-detail.schema';
import { currencies } from './data-currency';
import { experiences } from './data-experience';
import { fields } from './data-field';
import { levels } from './data-level';
import { locations } from './data-location';
import { majors } from './data-major';
import { types } from './data-type';
import { jobs } from './data-job';

const DB_NOT_EXIST_ERROR_CODE = '3D000';
export type DatabaseOptions = TypeOrmModuleOptions & { database: string };

const doCallbackWithAutoCloseConnection = async (
  option: DataSourceOptions,
  callback: (dataSource: DataSource) => Promise<void>,
) => {
  const appDataSource = await new DataSource(option).initialize();
  await callback(appDataSource);
  await appDataSource.destroy();
};

export class DatabaseConfiger {
  constructor(private defaultConfig: DatabaseOptions) {}

  private async isDatabaseExist(name: string) {
    try {
      const dataSourceOption = {
        ...this.defaultConfig,
        database: name,
      } as DataSourceOptions;

      await doCallbackWithAutoCloseConnection(dataSourceOption, async () => {});
    } catch (error) {
      if (error.code === DB_NOT_EXIST_ERROR_CODE) {
        return false;
      } else throw error;
    }
    return true;
  }

  private async createDatabase(name: string) {
    const createDatabaseSQL = `CREATE DATABASE ${name};`;
    const createDatabase = async (dataSource: DataSource) => {
      await dataSource.query(createDatabaseSQL);
    };

    const postgresDBConnectOption = {
      ...this.defaultConfig,
      database: 'postgres',
    } as DataSourceOptions;
    await doCallbackWithAutoCloseConnection(
      postgresDBConnectOption,
      createDatabase,
    );
  }

  private async insertData() {
    const option = {
      ...this.defaultConfig,
      entities: [
        Currency,
        Experience,
        Field,
        Major,
        Type,
        Level,
        Location,
        Job,
        JobDetail,
      ],
    } as DataSourceOptions;
    await doCallbackWithAutoCloseConnection(option, async (dataSource) => {
      await dataSource.getRepository(Currency).insert(currencies);
      await dataSource.getRepository(Experience).insert(experiences);
      await dataSource.getRepository(Field).insert(fields);
      await dataSource.getRepository(Level).insert(levels);
      await dataSource.getRepository(Major).insert(majors);
      await dataSource.getRepository(Type).insert(types);
      await dataSource.getRepository(Location).insert(locations);
      for (const createJobDto of jobs) {
        const job = await dataSource.getRepository(Job).save(createJobDto);
        const jobDetail = await dataSource
          .getRepository(JobDetail)
          .save(createJobDto);
        job.jobDetail = jobDetail;
        const major = await dataSource
          .getRepository(Major)
          .findOneBy({ id: createJobDto.majorId });
        job.major = major;
        //get level
        const level = await dataSource
          .getRepository(Level)
          .findOneBy({ id: createJobDto.levelId });
        job.level = level;
        //get currency
        const currency = await dataSource
          .getRepository(Currency)
          .findOneBy({ id: createJobDto.currencyId });
        job.currency = currency;
        //get exp
        const exp = await dataSource
          .getRepository(Experience)
          .findOneBy({ id: createJobDto.expId });
        job.exp = exp;
        //get type
        const type = await dataSource
          .getRepository(Type)
          .findOneBy({ id: createJobDto.typeId });
        job.type = type;
        //get list of fields
        job.fields = [];
        createJobDto.fieldsId.map(async (fieldId) => {
          const field = await dataSource
            .getRepository(Field)
            .findOneBy({ id: fieldId });
          job.fields.push(field);
        });

        //get list of locations
        job.locations = [];
        createJobDto.locationsId.map(async (locationId) => {
          const location = await dataSource
            .getRepository(Location)
            .findOneBy({ id: locationId });
          job.locations.push(location);
        });
        await dataSource.getRepository(Job).save(job);
      }
    });
  }

  private async initDatabase() {
    await this.createDatabase(this.defaultConfig.database);
    await this.insertData();
  }

  async config(): Promise<TypeOrmModuleOptions> {
    if (!(await this.isDatabaseExist(this.defaultConfig.database))) {
      await this.initDatabase();
    }

    return this.defaultConfig;
  }
}

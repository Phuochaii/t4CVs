import { plainToInstance } from 'class-transformer';
import { Mapper } from './base.mapper';
import { Injectable } from '@nestjs/common';
import { ApplicationSchema } from '../schema';
import { Application } from '../../../../domain/entity';

@Injectable()
export class UserNotificationSchemaMapper
  implements Mapper<Application, ApplicationSchema>
{
  toDomain(schema: ApplicationSchema): Application {
    return plainToInstance(Application, schema);
  }

  toSchema(domain: Application): ApplicationSchema {
    return plainToInstance(ApplicationSchema, domain);
  }
}

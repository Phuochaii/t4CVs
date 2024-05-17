import { ApplicationDto } from '../../domain/dto';
import { ApplicationSchema } from '../schema';
import { Mapper } from './base.mapper';

export class UserNotificationSchemaMapper
  implements Mapper<ApplicationDto, ApplicationSchema>
{
  toDomain(schema: ApplicationSchema): ApplicationDto {
    return {
      id: schema.id,
      status: schema.status,
      fullname: schema.fullname,
      phone: schema.phone,
      email: schema.email,
      coverLetter: schema.coverLetter,
      createdAt: schema.createdAt,
      updateAt: schema.updateAt,
      campaignId: schema.campaignId,
      userId: schema.userId,
      cvId: schema.cvId,
    };
  }

  toSchema(domain: ApplicationDto): ApplicationSchema {
    return {
      id: domain.id,
      status: domain.status,
      fullname: domain.fullname,
      phone: domain.phone,
      email: domain.email,
      coverLetter: domain.coverLetter,
      createdAt: domain.createdAt,
      updateAt: domain.updateAt,
      campaignId: domain.campaignId,
      userId: domain.userId,
      cvId: domain.cvId,
    };
  }
}

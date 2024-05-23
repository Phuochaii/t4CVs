import { GetCampaignDTO } from '../../domain/dto';
import { CampaignSchema } from '../schema';
import { Mapper } from './base.mapper';

export class CampaignSchemaMapper
  implements Mapper<GetCampaignDTO, CampaignSchema>
{
  toDomain(schema: CampaignSchema): GetCampaignDTO {
    return {
      id: schema.id,
      name: schema.name,
      createdAt: schema.createdAt,
      employerId: schema.employerId,
    };
  }
  toSchema(domain: GetCampaignDTO): CampaignSchema {
    return {
      id: domain.id,
      name: domain.name,
      createdAt: domain.createdAt,
      employerId: domain.employerId,
    };
  }
}

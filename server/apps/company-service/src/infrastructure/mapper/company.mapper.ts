import { GetCompanyDTO } from '../../domain/dto';
import { CompanySchema } from '../schema';
import { Mapper } from './base.mapper';

export class CompanySchemaMapper
  implements Mapper<GetCompanyDTO, CompanySchema>
{
  toDomain(schema: CompanySchema): GetCompanyDTO {
    return {
      id: schema.id,
      field: schema.field,
      taxCode: schema.taxCode,
      name: schema.name,
      website: schema.website,
      image: schema.image,
      address: schema.address,
      phone: schema.phone,
      companySize: schema.companySize,
      description: schema.description,
      status: schema.status,
    };
  }
  toSchema(domain: GetCompanyDTO): CompanySchema {
    return {
      id: domain.id,
      field: domain.field,
      taxCode: domain.taxCode,
      name: domain.taxCode,
      website: domain.website,
      image: domain.image,
      address: domain.address,
      phone: domain.phone,
      companySize: domain.companySize,
      description: domain.description,
      status: domain.status,
    };
  }
}

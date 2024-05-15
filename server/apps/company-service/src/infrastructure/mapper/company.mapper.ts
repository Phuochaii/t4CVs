import { GetCompanyDTO } from '../../domain/dto';
import { CompanySchema } from '../schema';
import { Mapper } from './base.mapper';

export class CompanySchemaMapper
  implements Mapper<GetCompanyDTO, CompanySchema>
{
  toDomain(schema: CompanySchema): GetCompanyDTO {
    return {
      company: {
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
      },
    };
  }
  toSchema(domain: GetCompanyDTO): CompanySchema {
    return {
      id: domain.company.id,
      field: domain.company.field,
      taxCode: domain.company.taxCode,
      name: domain.company.taxCode,
      website: domain.company.website,
      image: domain.company.image,
      address: domain.company.address,
      phone: domain.company.phone,
      companySize: domain.company.companySize,
      description: domain.company.description,
      status: domain.company.status,
    };
  }
}

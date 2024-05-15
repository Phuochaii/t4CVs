import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from '../../domain/repository';
import { Repository } from 'typeorm';
import { CompanySchema } from '../schema';
import { PaginationRequest } from '@app/common/dto/pagination';
import { CreateCompanyDTO, GetCompanyDTO } from '../../domain/dto';
import { Company } from '../../domain/entity';
import { CompanySchemaMapper } from '../mapper/company.mapper';

export class TypeOrmCompanyRepository extends CompanyRepository {
  constructor(
    @InjectRepository(CompanySchema)
    private readonly companyRepository: Repository<CompanySchema>,
  ) {
    super();
  }

  async createCompany(company: CreateCompanyDTO): Promise<Company> {
    return await this.companyRepository.save(company);
  }

  async getAllCompanyPagination(
    pagination: PaginationRequest,
  ): Promise<GetCompanyDTO[]> {
    const companies = await this.companyRepository.find({
      skip: pagination.offset,
      take: pagination.limit,
    });

    return companies.map((company) => {
      return new CompanySchemaMapper().toDomain(company);
    });
  }

  async getTotalCompanies(): Promise<number> {
    const total = await this.companyRepository.count();

    return total;
  }

  async findCompanyById(id: number): Promise<GetCompanyDTO> {
    const result = await this.companyRepository.findOne({
      where: {
        id,
      },
    });
    return new CompanySchemaMapper().toDomain(result);
  }
}

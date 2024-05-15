import { PaginationRequest } from '@app/common/dto/pagination';
import { CreateCompanyDTO, GetCompanyDTO } from '../dto';
import { Company } from '../entity';

export abstract class CompanyRepository {
  abstract createCompany(company: CreateCompanyDTO): Promise<Company>;

  abstract getAllCompanyPagination(
    pagination: PaginationRequest,
  ): Promise<GetCompanyDTO[]>;

  abstract getTotalCompanies(): Promise<number>;

  abstract findCompanyById(id: number): Promise<GetCompanyDTO>;
}

import { GetCompanyDTO } from '../../dto';
import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllCompanyPaginationService
  implements BaseService<GetCompanyDTO[]>
{
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(page: number, limit: number): Promise<GetCompanyDTO[]> {
    const companies = await this.companyRepository.getAllCompanyPagination(
      page,
      limit,
    );

    return companies;
  }
}

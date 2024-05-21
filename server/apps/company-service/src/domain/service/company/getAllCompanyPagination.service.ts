import { Company } from '../../entity';
import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllCompanyPaginationService implements BaseService<Company[]> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(page: number, limit: number): Promise<Company[]> {
    const companies = await this.companyRepository.getAllCompanyPagination(
      page,
      limit,
    );

    return companies;
  }
}

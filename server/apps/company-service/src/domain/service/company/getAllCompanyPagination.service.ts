import { PaginationRequest } from '@app/common/dto/pagination';
import { GetCompanyDTO } from '../../dto';
import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllCompanyPaginationService
  implements BaseService<GetCompanyDTO[]>
{
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(
    paginationRequest = new PaginationRequest({ page: 1, limit: 10 }),
  ): Promise<GetCompanyDTO[]> {
    const companies =
      await this.companyRepository.getAllCompanyPagination(paginationRequest);

    return companies;
  }
}

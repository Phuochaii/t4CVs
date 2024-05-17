import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetTotalCompaniesService implements BaseService<number> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  execute(): Promise<number> {
    const total = this.companyRepository.getTotalCompanies();

    return total;
  }
}

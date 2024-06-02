import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetTotalCompanyByNameService implements BaseService<number> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  execute(name: string): Promise<number> {
    const total = this.companyRepository.getTotalCompanyByName(name);

    return total;
  }
}

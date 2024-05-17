import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class RemoveCompanyService implements BaseService<string> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  execute(id: number): Promise<string> {
    return this.companyRepository.removeCompany(id);
  }
}

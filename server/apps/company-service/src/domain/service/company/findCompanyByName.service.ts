import { Company } from '../../entity';
import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class FindCompanyByNameService implements BaseService<Company[]> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  execute(name: string, page: number, limit: number): Promise<Company[]> {
    const result = this.companyRepository.findCompanyByName(name, page, limit);

    return result;
  }
}

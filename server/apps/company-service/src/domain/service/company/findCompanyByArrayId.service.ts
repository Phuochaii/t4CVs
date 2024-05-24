import { Company } from '../../entity';
import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class FindCompanyByArrayIdService implements BaseService<Company[]> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  execute(id: number[]): Promise<Company[]> {
    const result = this.companyRepository.findCompanyByArrayId(id);

    return result;
  }
}

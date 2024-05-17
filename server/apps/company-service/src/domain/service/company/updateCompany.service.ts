import { UpdateCompanyDTO } from '../../dto';
import { Company } from '../../entity';
import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class UpdateCompanyService implements BaseService<Company> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  execute(company: UpdateCompanyDTO): Promise<Company> {
    const result = this.companyRepository.updateCompany(company);

    return result;
  }
}

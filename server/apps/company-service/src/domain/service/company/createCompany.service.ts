import { CreateCompanyDTO } from '../../dto';
import { Company } from '../../entity';
import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class CreateCompanyService implements BaseService<Company> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  execute(company: CreateCompanyDTO): Promise<Company> {
    const createdCompany = this.companyRepository.createCompany(company);

    return createdCompany;
  }
}

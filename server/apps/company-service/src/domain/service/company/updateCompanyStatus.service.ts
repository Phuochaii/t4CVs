import { UpdateCompanyStatusDTO } from '../../dto';
import { Company } from '../../entity';
import { CompanyRepository } from '../../repository';
import { BaseService } from '../base.service';

export class UpdateCompanyStatusService implements BaseService<Company> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  execute(company: UpdateCompanyStatusDTO): Promise<Company> {
    const result = this.companyRepository.updateCompanyStatus(company);

    return result;
  }
}

import { CreateCompanyDTO } from './dto';
import { Company } from './entity';
import { CreateCompanyService } from './service';

export class CompanyApplication {
  constructor(private readonly createCompanyService: CreateCompanyService) {}

  async createCompany(request: CreateCompanyDTO): Promise<Company> {
    return await this.createCompanyService.execute(request);
  }
}

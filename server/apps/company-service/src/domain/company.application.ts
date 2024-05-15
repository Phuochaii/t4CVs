import { PaginationRequest } from '@app/common/dto/pagination';
import { CreateCompanyDTO, GetCompanyDTO } from './dto';
import { Company } from './entity';
import {
  CreateCompanyService,
  GetAllCompanyPaginationService,
  GetTotalCompaniesService,
} from './service';

export class CompanyApplication {
  constructor(
    private readonly createCompanyService: CreateCompanyService,
    private readonly getAllCompanyPaginationService: GetAllCompanyPaginationService,
    private readonly getTotalCompaniesService: GetTotalCompaniesService,
  ) {}

  async createCompany(request: CreateCompanyDTO): Promise<Company> {
    return await this.createCompanyService.execute(request);
  }

  async getAllCompanyPagination(
    request = new PaginationRequest({ page: 1, limit: 10 }),
  ): Promise<GetCompanyDTO[]> {
    return await this.getAllCompanyPaginationService.execute(request);
  }

  async getTotalCompanies(): Promise<number> {
    return await this.getTotalCompaniesService.execute();
  }
}

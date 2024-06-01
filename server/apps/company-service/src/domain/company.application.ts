import {
  CreateCompanyDTO,
  UpdateCompanyDTO,
  UpdateCompanyStatusDTO,
} from './dto';
import { Company } from './entity';
import {
  CreateCompanyService,
  GetAllCompanyPaginationService,
  GetTotalCompaniesService,
  FindCompanyByIdService,
  UpdateCompanyStatusService,
  RemoveCompanyService,
  FindCompanyByArrayIdService,
  UpdateCompanyService,
} from './service';

export class CompanyApplication {
  constructor(
    private readonly createCompanyService: CreateCompanyService,
    private readonly getAllCompanyPaginationService: GetAllCompanyPaginationService,
    private readonly getTotalCompaniesService: GetTotalCompaniesService,
    private readonly findCompanyByIdService: FindCompanyByIdService,
    private readonly updateCompanyService: UpdateCompanyService,
    private readonly updateCompanyStatusService: UpdateCompanyStatusService,
    private readonly removeCompanyService: RemoveCompanyService,
    private readonly findCompanyByArrayIdService: FindCompanyByArrayIdService,
  ) {}

  async createCompany(request: CreateCompanyDTO): Promise<Company> {
    return await this.createCompanyService.execute(request);
  }

  async getAllCompanyPagination(
    page: number,
    limit: number,
  ): Promise<Company[]> {
    return await this.getAllCompanyPaginationService.execute(page, limit);
  }

  async getTotalCompanies(): Promise<number> {
    return await this.getTotalCompaniesService.execute();
  }

  async findCompanyById(id: number): Promise<Company> {
    return await this.findCompanyByIdService.execute(id);
  }

  async updateCompany(company: UpdateCompanyDTO): Promise<Company> {
    return await this.updateCompanyService.execute(company);
  }

  async updateCompanyStatus(company: UpdateCompanyStatusDTO): Promise<Company> {
    return await this.updateCompanyStatusService.execute(company);
  }

  async removeCompany(id: number): Promise<string> {
    return await this.removeCompanyService.execute(id);
  }

  async findCompanyByArrayId(id: number[]): Promise<Company[]> {
    return await this.findCompanyByArrayIdService.execute(id);
  }
}

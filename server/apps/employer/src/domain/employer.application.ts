import {
  CreateEmployerDTO,
  UpdateEmployerCompanyDTO,
  UpdateEmployerDTO,
} from './dto';
import { Employer } from './entity';
import {
  CreateEmployerService,
  GetAllEmployerByCompanyIdService,
  GetEmployerByIdService,
  GetEmployerByNameService,
  GetEmployerService,
  GetTotalEmployerByNameService,
  GetTotalEmployerService,
  UpdateEmployerCompanyIdService,
  UpdateEmployerLicenseService,
  UpdateEmployerLicenseStatusService,
  UpdateEmployerPhoneStatusService,
  UpdateEmployerService,
} from './service';

export class EmployerApplication {
  constructor(
    private readonly createEmployerService: CreateEmployerService,
    private readonly getAllEmployerService: GetEmployerService,
    private readonly getTotalEmployerService: GetTotalEmployerService,
    private readonly getEmployerByIdService: GetEmployerByIdService,
    private readonly getAllEmployerByCompanyIdService: GetAllEmployerByCompanyIdService,
    private readonly updateEmployerCompanyIdService: UpdateEmployerCompanyIdService,
    private readonly updateEmployerLicenseService: UpdateEmployerLicenseService,
    private readonly updateEmployerLicenseStatusService: UpdateEmployerLicenseStatusService,
    private readonly updateEmployerPhoneStatusService: UpdateEmployerPhoneStatusService,
    private readonly updateEmployerService: UpdateEmployerService,
    private readonly getEmployerByNameService: GetEmployerByNameService,
    private readonly getTotalEmployerByNameService: GetTotalEmployerByNameService,
  ) {}

  async createEmployer(request: CreateEmployerDTO): Promise<Employer> {
    return await this.createEmployerService.execute(request);
  }

  async getAllEmployer(page: number, limit: number): Promise<Employer[]> {
    return await this.getAllEmployerService.execute(page, limit);
  }

  async getTotalEmployer(): Promise<number> {
    return await this.getTotalEmployerService.execute();
  }

  async getEmployerById(id: string): Promise<Employer> {
    return await this.getEmployerByIdService.execute(id);
  }

  async getAllEmployerByCompanyId(companyId: number): Promise<Employer[]> {
    return await this.getAllEmployerByCompanyIdService.execute(companyId);
  }

  async updateEmployerCompanyId(
    request: UpdateEmployerCompanyDTO,
  ): Promise<Employer> {
    return await this.updateEmployerCompanyIdService.execute(request);
  }

  async updateEmployerLicense(
    employerId: string,
    license: string,
  ): Promise<Employer> {
    return await this.updateEmployerLicenseService.execute(employerId, license);
  }

  async updateEmployerLicenseStatus(
    id: string,
    licenseStatus: boolean,
  ): Promise<Employer> {
    return await this.updateEmployerLicenseStatusService.execute(
      id,
      licenseStatus,
    );
  }

  async updateEmployerPhoneStatus(
    id: string,
    phoneNumberStatus: boolean,
  ): Promise<Employer> {
    return await this.updateEmployerPhoneStatusService.execute(
      id,
      phoneNumberStatus,
    );
  }

  async updateEmployer(data: UpdateEmployerDTO): Promise<Employer> {
    return await this.updateEmployerService.execute(data);
  }

  async getEmployerByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<Employer[]> {
    return await this.getEmployerByNameService.execute(name, page, limit);
  }

  async getTotalEmployerByName(name: string): Promise<number> {
    return await this.getTotalEmployerByNameService.execute(name);
  }
}

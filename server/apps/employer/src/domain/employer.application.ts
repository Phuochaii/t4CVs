import { CreateEmployerDTO, UpdateEmployerCompanyDTO } from './dto';
import { Employer } from './entity';
import {
  CreateEmployerService,
  GetEmployerByIdService,
  GetEmployerService,
  GetTotalEmployerService,
  UpdateEmployerCompanyIdService,
  UpdateEmployerLicenseService,
  UpdateEmployerLicenseStatusService,
  UpdateEmployerPhoneStatusService,
} from './service';

export class EmployerApplication {
  constructor(
    private readonly createEmployerService: CreateEmployerService,
    private readonly getAllEmployerService: GetEmployerService,
    private readonly getTotalEmployerService: GetTotalEmployerService,
    private readonly getEmployerByIdService: GetEmployerByIdService,
    private readonly updateEmployerCompanyIdService: UpdateEmployerCompanyIdService,
    private readonly updateEmployerLicenseService: UpdateEmployerLicenseService,
    private readonly updateEmployerLicenseStatusService: UpdateEmployerLicenseStatusService,
    private readonly updateEmployerPhoneStatusService: UpdateEmployerPhoneStatusService,
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

  async updateEmployerLicenseStatus(id: string): Promise<Employer> {
    return await this.updateEmployerLicenseStatusService.execute(id);
  }

  async updateEmployerPhoneStatus(id: string): Promise<Employer> {
    return await this.updateEmployerPhoneStatusService.execute(id);
  }
}

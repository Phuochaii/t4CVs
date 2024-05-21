import { CreateEmployerDTO, UpdateEmployerCompanyDTO } from '../dto';
import { Employer } from '../entity';

export abstract class EmployerRepository {
  abstract getAllEmployer(page: number, limit: number): Promise<Employer[]>;

  abstract getEmployerById(id: string): Promise<Employer>;

  abstract createEmployer(employer: CreateEmployerDTO): Promise<Employer>;

  abstract getTotalEmployer(): Promise<number>;

  abstract updateEmployerLincense(
    employerId: string,
    license: string,
  ): Promise<Employer>;

  abstract updateEmployerCompany(
    employerCompany: UpdateEmployerCompanyDTO,
  ): Promise<Employer>;

  abstract updateEmployerPhoneStatus(id: string): Promise<Employer>;

  abstract updateEmployerLicenseStatus(id: string): Promise<Employer>;
}

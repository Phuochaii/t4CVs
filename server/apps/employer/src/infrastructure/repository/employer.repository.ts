import { Repository } from 'typeorm';
import { EmployerRepository } from '../../domain/repository';
import { EmployerSchema } from '../schema';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployerDTO, UpdateEmployerCompanyDTO } from '../../domain/dto';
import { Employer } from '../../domain/entity';

export class TypeOrmEmployerRepository extends EmployerRepository {
  constructor(
    @InjectRepository(EmployerSchema)
    private readonly employerRepository: Repository<EmployerSchema>,
  ) {
    super();
  }

  async getAllEmployer(page: number, limit: number): Promise<Employer[]> {
    const skip = (page - 1) * limit;

    const employers = await this.employerRepository.find({
      skip: skip,
      take: limit,
      order: {
        fullname: 'ASC',
      },
    });

    return employers;
  }

  async getEmployerById(id: string): Promise<Employer> {
    const result = await this.employerRepository.findOne({
      where: {
        id,
      },
    });
    return result;
  }

  async createEmployer(employer: CreateEmployerDTO): Promise<Employer> {
    return await this.employerRepository.save(employer);
  }

  async getTotalEmployer(): Promise<number> {
    const total = await this.employerRepository.count();

    return total;
  }

  async getEmployerByCompanyId(companyId: number): Promise<Employer[]> {
    const result = await this.employerRepository.find({
      where: { companyId: companyId },
      order: {
        fullname: 'ASC',
      },
    });

    return result;
  }

  async updateEmployerLincense(
    employerId: string,
    license: string,
  ): Promise<Employer> {
    await this.employerRepository.update(employerId, {
      license: license,
    });

    const result = await this.getEmployerById(employerId);

    return result;
  }

  async updateEmployerCompany(
    employerCompany: UpdateEmployerCompanyDTO,
  ): Promise<Employer> {
    await this.employerRepository.update(employerCompany.id, {
      companyId: employerCompany.companyId,
    });

    const result = await this.getEmployerById(employerCompany.id);

    return result;
  }

  async updateEmployerPhoneStatus(
    id: string,
    phoneNumberStatus: boolean,
  ): Promise<Employer> {
    await this.employerRepository.update(id, {
      phoneNumberStatus: phoneNumberStatus,
    });

    return await this.getEmployerById(id);
  }

  async updateEmployerLicenseStatus(
    id: string,
    licenseStatus: boolean,
  ): Promise<Employer> {
    await this.employerRepository.update(id, {
      licenseStatus: licenseStatus,
    });

    return await this.getEmployerById(id);
  }
}

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployerApplication, PositionApplication } from './domain';
import { CreateEmployerDTO, UpdateEmployerCompanyDTO } from './domain/dto';

@Controller()
export class EmployerController {
  constructor(
    private readonly employerApplication: EmployerApplication,
    private readonly positionApplication: PositionApplication,
  ) {}

  @MessagePattern({ cmd: 'create_employer' })
  async createEmployer(employer: CreateEmployerDTO) {
    const result = await this.employerApplication.createEmployer(employer);

    if (result) {
      return result;
    } else {
      return 'Your company id not exists';
    }
  }

  @MessagePattern({ cmd: 'get_all_employers' })
  async findAllEmployers(@Payload() data: any) {
    const page = Number(data.page);
    const limit = Number(data.limit);

    const total = Number(await this.employerApplication.getTotalEmployer());
    const total_page = Math.ceil(total / limit);

    const data_find = await this.employerApplication.getAllEmployer(
      page,
      limit,
    );

    const result = {
      page: page,
      limit: limit,
      total: total,
      total_page: total_page,
      data: data_find,
    };

    return result;
  }

  @MessagePattern({ cmd: 'find_employer_by_id' })
  findEmployerById(id: string) {
    const employer = this.employerApplication.getEmployerById(id);

    if (employer) {
      return employer;
    } else {
      return 'Your employerId not exsist';
    }
  }

  @MessagePattern({ cmd: 'update_employer_companyid' })
  updateEmployerCompanyId(employer: UpdateEmployerCompanyDTO) {
    const result = this.employerApplication.updateEmployerCompanyId(employer);

    if (result) {
      return result;
    } else {
      return 'Your employerId not exsist';
    }
  }

  @MessagePattern({ cmd: 'update_employer_license' })
  updateEmployerLicense(@Payload() data: any) {
    const employerId = String(data.employerId);
    const license = String(data.license);

    const result = this.employerApplication.updateEmployerLicense(
      employerId,
      license,
    );

    if (result) {
      return result;
    } else {
      return 'Your employerId not exsist';
    }
  }

  @MessagePattern({ cmd: 'update_employer_license_status' })
  updateEmployerLicenseStatus(employerId: string) {
    const result =
      this.employerApplication.updateEmployerLicenseStatus(employerId);

    if (result) {
      return result;
    } else {
      return 'Your employerId not exsist';
    }
  }

  @MessagePattern({ cmd: 'update_employer_phone_status' })
  updateEmployerPhoneStatus(employerId: string) {
    const result =
      this.employerApplication.updateEmployerPhoneStatus(employerId);

    if (result) {
      return result;
    } else {
      return 'Your employerId not exsist';
    }
  }

  @MessagePattern({ cmd: 'get_all_positions' })
  findAllPosition() {
    return this.positionApplication.getAllPosition();
  }

  @MessagePattern({ cmd: 'find_position_by_id' })
  findPositionById(id: number) {
    return this.positionApplication.getPositionById(id);
  }
}

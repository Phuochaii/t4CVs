import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { EmployerApplication, PositionApplication } from './domain';
import {
  CreateEmployerDTO,
  UpdateEmployerCompanyDTO,
  UpdateEmployerDTO,
} from './domain/dto';

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
  async findEmployerById(id: string) {
    const employer = await this.employerApplication.getEmployerById(id);

    if (employer) {
      return employer;
    } else {
      throw new RpcException(new BadRequestException('EmployerId not exsist'));
    }
  }

  @MessagePattern({ cmd: 'get_employer_by_companyid' })
  getEmployerByComapnyId(companyId: number) {
    const employer =
      this.employerApplication.getAllEmployerByCompanyId(companyId);

    return employer;
  }

  @MessagePattern({ cmd: 'update_employer_companyid' })
  async updateEmployerCompanyId(employer: UpdateEmployerCompanyDTO) {
    const result =
      await this.employerApplication.updateEmployerCompanyId(employer);

    if (result) {
      return result;
    } else {
      throw new RpcException(new BadRequestException('EmployerId not exsist'));
    }
  }

  @MessagePattern({ cmd: 'update_employer_license' })
  async updateEmployerLicense(@Payload() data: any) {
    const employerId = String(data.employerId);
    const license = String(data.license);

    const result = await this.employerApplication.updateEmployerLicense(
      employerId,
      license,
    );

    if (result) {
      return result;
    } else {
      throw new RpcException(new BadRequestException('EmployerId not exsist'));
    }
  }

  @MessagePattern({ cmd: 'update_employer_license_status' })
  async updateEmployerLicenseStatus(@Payload() data: any) {
    const employerId = String(data.employerId);
    const licenseStatus = Boolean(data.licenseStatus);

    const result = await this.employerApplication.updateEmployerLicenseStatus(
      employerId,
      licenseStatus,
    );

    if (result) {
      return result;
    } else {
      throw new RpcException(new BadRequestException('EmployerId not exsist'));
    }
  }

  @MessagePattern({ cmd: 'update_employer_phone_status' })
  async updateEmployerPhoneStatus(@Payload() data: any) {
    const employerId = String(data.employerId);
    const phoneNumberStatus = Boolean(data.phoneNumberStatus);

    const result = await this.employerApplication.updateEmployerPhoneStatus(
      employerId,
      phoneNumberStatus,
    );

    if (result) {
      return result;
    } else {
      throw new RpcException(new BadRequestException('EmployerId not exsist'));
    }
  }

  @MessagePattern({ cmd: 'update_employer' })
  async updateEmployer(employer: UpdateEmployerDTO) {
    const result = await this.employerApplication.updateEmployer(employer);

    if (result) {
      return result;
    } else {
      throw new RpcException(new BadRequestException('EmployerId not exsist'));
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

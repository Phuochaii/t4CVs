import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
<<<<<<< HEAD
import { EmployerApplication, PositionApplication } from './domain';
import { CreateEmployerDTO, UpdateEmployerCompanyDTO } from './domain/dto';
=======
import { EmployerService } from './employer.service';
import { PositionService } from './position/position.service';
import { CreateEmployerDto } from './dto/Req/create-employer.dto';
>>>>>>> 80f65bf8591fcdecb03f2f3aa8bdd4d9670c9256

@Controller()
export class EmployerController {
  constructor(
    private readonly employerService: EmployerService,
    private readonly positionService: PositionService,
  ) {}

  @MessagePattern({ cmd: 'create_employer' })
  createEmployer(employer: CreateEmployerDto) {
    return this.employerService.createEmployer(employer);
  }

  @MessagePattern({ cmd: 'get_all_employers' })
  async findAllEmployers(@Payload() data: any) {
    const page = Number(data.page);
    const limit = Number(data.limit);

    const total = Number(await this.employerService.getTotalEmployers());
    const total_page = Math.ceil(total / limit);

    const data_find = await this.employerService.findAllEmployers(page, limit);

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
  findEmployerById(id: number) {
    return this.employerService.findEmployerById(id);
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
    return this.positionService.findAllPositions();
  }

  @MessagePattern({ cmd: 'find_position_by_id' })
  findPositionById(id: number) {
    return this.positionService.findPositionById(id);
  }
}

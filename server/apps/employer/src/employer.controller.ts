import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmployerService } from './employer.service';
import { PositionService } from './position/position.service';
import { CreateEmployerDto } from './dto/Req/create-employer.dto';

@Controller()
export class EmployerController {
  constructor(
    private readonly employerService: EmployerService,
    private readonly positionService: PositionService,
  ) {}

  @MessagePattern({ cmd: 'create_employer' })
  createEmployer(employer: CreateEmployerDto) {
    this.employerService.createEmployer(employer);
    return 'Employer created successfully!';
  }

  @MessagePattern({ cmd: 'get_all_employers' })
  findAllEmployers() {
    return this.employerService.findAllEmployers();
  }

  @MessagePattern({ cmd: 'find_employer_by_id' })
  findEmployerById(id: number) {
    return this.employerService.findEmployerById(id);
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

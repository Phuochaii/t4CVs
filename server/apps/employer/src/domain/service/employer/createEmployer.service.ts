import { CreateEmployerDTO } from '../../dto';
import { Employer } from '../../entity';
import { EmployerRepository, PositionRepository } from '../../repository';
import { BaseService } from '../base.service';

export class CreateEmployerService implements BaseService<Employer> {
  constructor(
    private readonly employerRepository: EmployerRepository,
    private readonly positionRepository: PositionRepository,
  ) {}

  async execute(employer: CreateEmployerDTO): Promise<Employer> {
    const position = await this.positionRepository.getPositionById(
      employer.positionId,
    );

    if (position) {
      return this.employerRepository.createEmployer(employer);
    } else {
      return null;
    }
  }
}

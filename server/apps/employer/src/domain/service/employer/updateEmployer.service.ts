import { UpdateEmployerDTO } from '../../dto';
import { Employer } from '../../entity';
import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class UpdateEmployerService implements BaseService<Employer> {
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(data: UpdateEmployerDTO): Promise<Employer> {
    const result = this.employerRepository.updateEmployer(data);

    return result;
  }
}

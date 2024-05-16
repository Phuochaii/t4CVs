import { Employer } from '../../entity';
import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetEmployerByIdService implements BaseService<Employer> {
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(id: string): Promise<Employer> {
    const employer = this.employerRepository.getEmployerById(id);

    return employer;
  }
}

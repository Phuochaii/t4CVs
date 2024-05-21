import { Employer } from '../../entity';
import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetEmployerService implements BaseService<Employer[]> {
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(page: number, limit: number): Promise<Employer[]> {
    const employers = this.employerRepository.getAllEmployer(page, limit);

    return employers;
  }
}

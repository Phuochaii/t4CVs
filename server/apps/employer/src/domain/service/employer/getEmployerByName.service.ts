import { Employer } from '../../entity';
import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetEmployerByNameService implements BaseService<Employer[]> {
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(name: string, page: number, limit: number): Promise<Employer[]> {
    const employer = this.employerRepository.getEmployerByName(
      name,
      page,
      limit,
    );

    return employer;
  }
}

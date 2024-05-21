import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetTotalEmployerService implements BaseService<number> {
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(): Promise<number> {
    const total = this.employerRepository.getTotalEmployer();

    return total;
  }
}

import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetTotalEmployerByNameService implements BaseService<number> {
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(name: string): Promise<number> {
    const total = this.employerRepository.getTotalEmployerByName(name);

    return total;
  }
}

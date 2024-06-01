import { Employer } from '../../entity';
import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class GetAllEmployerByCompanyIdService
  implements BaseService<Employer[]>
{
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(companyId: number): Promise<Employer[]> {
    const employers = this.employerRepository.getEmployerByCompanyId(companyId);

    return employers;
  }
}

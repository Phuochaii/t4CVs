import { UpdateEmployerCompanyDTO } from '../../dto';
import { Employer } from '../../entity';
import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class UpdateEmployerCompanyIdService implements BaseService<Employer> {
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(employer: UpdateEmployerCompanyDTO): Promise<Employer> {
    const result = this.employerRepository.updateEmployerCompany(employer);

    return result;
  }
}

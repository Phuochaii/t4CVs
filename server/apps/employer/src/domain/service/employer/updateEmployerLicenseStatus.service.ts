import { Employer } from '../../entity';
import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class UpdateEmployerLicenseStatusService
  implements BaseService<Employer>
{
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(id: string): Promise<Employer> {
    const result = this.employerRepository.updateEmployerLicenseStatus(id);

    return result;
  }
}

import { Employer } from '../../entity';
import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class UpdateEmployerLicenseStatusService
  implements BaseService<Employer>
{
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(id: string, licenseStatus: boolean): Promise<Employer> {
    const result = this.employerRepository.updateEmployerLicenseStatus(
      id,
      licenseStatus,
    );

    return result;
  }
}

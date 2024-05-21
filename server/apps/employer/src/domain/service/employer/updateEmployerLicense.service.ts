import { Employer } from '../../entity';
import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class UpdateEmployerLicenseService implements BaseService<Employer> {
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(employerId: string, license: string): Promise<Employer> {
    const result = this.employerRepository.updateEmployerLincense(
      employerId,
      license,
    );

    return result;
  }
}

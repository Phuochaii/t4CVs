import { Employer } from '../../entity';
import { EmployerRepository } from '../../repository';
import { BaseService } from '../base.service';

export class UpdateEmployerPhoneStatusService implements BaseService<Employer> {
  constructor(private readonly employerRepository: EmployerRepository) {}

  execute(id: string, phoneNumberStatus: boolean): Promise<Employer> {
    const result = this.employerRepository.updateEmployerPhoneStatus(
      id,
      phoneNumberStatus,
    );

    return result;
  }
}

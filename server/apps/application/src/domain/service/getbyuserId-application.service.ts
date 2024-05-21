import { BaseService } from './base.service';
import { ApplicationRepository } from '../repository';
import { Application } from '../entity';

export class GetByUserIdApplicationService
  implements BaseService<Application[]>
{
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(ApplicationDto): Promise<Application[]> {
    const getApplication =
      await this.applicationRepository.getByUserIdApplication(ApplicationDto);
    return getApplication;
  }
}

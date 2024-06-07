import { BaseService } from '@app/common/domain';
import { ApplicationRepository } from '../repository';
import { Application } from '../entity';

export class GetByUserIdApplicationService
  implements BaseService<Application[]>
{
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(ApplicationDto): Promise<Application[] | null> {
    const getApplication =
      await this.applicationRepository.readRepository.getByUserIdApplication(ApplicationDto);
    return getApplication;
  }
}

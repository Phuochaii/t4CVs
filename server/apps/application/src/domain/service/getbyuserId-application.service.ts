import { BaseService } from '@app/common/domain';
import { Application } from '../entity';
import { ApplicationReadRepository } from '../repository';

export class GetByUserIdApplicationService
  implements BaseService<Application[]>
{
  constructor(private readonly applicationRepository: ApplicationReadRepository) {}

  async execute(ApplicationDto): Promise<Application[] | null> {
    const getApplication =
      await this.applicationRepository.getByUserIdApplication(ApplicationDto);
    return getApplication;
  }
}

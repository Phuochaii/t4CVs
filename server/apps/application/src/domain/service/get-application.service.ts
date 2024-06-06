import { ApplicationRepository } from '../repository';
import { Application } from '../entity';
import { BaseService } from '@app/common/domain';

export class GetApplicationService implements BaseService<Application> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(ApplicationDto): Promise<Application | null> {
    const getApplication =
      await this.applicationRepository.getApplication(ApplicationDto);
    return getApplication;
  }
}

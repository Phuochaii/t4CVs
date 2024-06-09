import { BaseService } from '@app/common/domain';
import { Application } from '../entity';
import { ApplicationReadRepository } from '../repository';

export class UpdateApplicationService implements BaseService<Application> {
  constructor(private readonly applicationRepository: ApplicationReadRepository) {}

  async execute(ApplicationDto): Promise<Application | null> {
    const updateApplication =
      await this.applicationRepository.updateApplication(ApplicationDto);
    return updateApplication;
  }
}

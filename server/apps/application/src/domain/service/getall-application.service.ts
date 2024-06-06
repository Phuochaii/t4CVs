import { ApplicationRepository } from '../repository';
import { Application } from '../entity';
import { BaseService } from '@app/common/domain';

export class GetAllApplicationService implements BaseService<Application[]> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(ApplicationDto): Promise<Application[]> {
    const getApplication =
      await this.applicationRepository.getAllApplication(ApplicationDto);
    return getApplication;
  }
}

import { ApplicationRepository } from '../repository';
import { Application } from '../entity';
import { BaseService } from '@app/common/domain';
import { GetApplicationByIdDto } from '../dto';

export class GetApplicationService implements BaseService<Application> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(request: GetApplicationByIdDto): Promise<Application | null> {
    const getApplication = await this.applicationRepository.getById(request);
    return getApplication;
  }
}

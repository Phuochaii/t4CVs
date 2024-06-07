import { ApplicationRepository } from '../repository';
import { Application } from '../entity';
import { BaseService } from '@app/common/domain';
import { GetAllApplicationsDto } from '../dto';

export class GetAllApplicationService implements BaseService<Application[]> {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async execute(request: GetAllApplicationsDto): Promise<Application[]> {
    const applications =
      await this.applicationRepository.getAllApplication(request);
    return applications;
  }
}

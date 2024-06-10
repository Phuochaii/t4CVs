import { Application } from '../entity';
import { BaseService } from '@app/common/domain';
import { GetAllApplicationsDto } from '../dto';
import { ApplicationReadRepository } from '../repository';

export class GetAllApplicationService implements BaseService<Application[]> {
  constructor(private readonly applicationRepository: ApplicationReadRepository) {}

  async execute(request: GetAllApplicationsDto): Promise<Application[]> {
    const applications =
      await this.applicationRepository.getAllApplication(request);
    return applications;
  }
}

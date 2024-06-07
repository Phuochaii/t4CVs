import { ApplicationRepository } from '../repository';
import { Application } from '../entity';
import { BaseService } from '@app/common/domain';
import { CreateApplicationDto } from '../dto';
import { ApplicationFactory } from '../factory/application.factory';

export class CreateApplicationService implements BaseService<Application> {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly applicationFactory: ApplicationFactory,
  ) {}

  async execute(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const newApplication =
      await this.applicationFactory.createApplication(createApplicationDto);
    await this.applicationRepository.writeRepository.save(newApplication);
    return newApplication;
  }
}

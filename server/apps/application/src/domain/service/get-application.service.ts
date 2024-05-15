import { BaseService } from './base.service';
import { ApplicationRepository } from '../repository';
import { Application } from '../entity';
// import { ApplicationDto } from '../dto';

export class GetApplicationService implements BaseService<Application> {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    // private readonly userNotificationRepository: UserNotificationRepository,
  ) {}

  async execute(ApplicationDto): Promise<Application> {
    const getApplication =
      await this.applicationRepository.getApplication(ApplicationDto);
    return getApplication;
  }
}

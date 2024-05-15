import { ApplicationDto, GetApplicationDto } from '../dto';
import { Application } from '../entity';

export abstract class ApplicationRepository {
  abstract createApplication(application: ApplicationDto): Promise<Application>;

  abstract getApplication(application: GetApplicationDto): Promise<Application>;
}

import {
  ApplicationDto,
  GetApplicationDto,
  GetAllApplicationsDto,
  UpdateApplicationDto,
} from '../dto';
import { Application } from '../entity';

export abstract class ApplicationRepository {
  abstract createApplication(application: ApplicationDto): Promise<Application>;

  abstract getApplication(application: GetApplicationDto): Promise<Application>;

  abstract getAllApplication(
    application: GetAllApplicationsDto,
  ): Promise<Application[]>;

  abstract updateApplication(
    application: UpdateApplicationDto,
  ): Promise<Application>;
}

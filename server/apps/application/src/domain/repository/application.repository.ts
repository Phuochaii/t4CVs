import {
  ApplicationDto,
  GetApplicationDto,
  GetAllApplicationsDto,
} from '../dto';
import { Application } from '../entity';

export abstract class ApplicationRepository {
  abstract createApplication(application: ApplicationDto): Promise<Application>;

  abstract getApplication(application: GetApplicationDto): Promise<Application>;

  abstract getAllApplication(
    application: GetAllApplicationsDto,
  ): Promise<Application[]>;
}

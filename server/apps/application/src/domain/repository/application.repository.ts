import {
  ApplicationDto,
  GetApplicationDto,
  GetAllApplicationsDto,
  UpdateApplicationDto,
  GetByCampaignIdApplicationDto,
  GetAllByCampaignIdApplicationDto,
  GetByUserIdApplicationDto,
  GetByUserIdPaginationApplicationDto,
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

  abstract getByCampaignIdApplication(
    application: GetByCampaignIdApplicationDto,
  ): Promise<Application[]>;

  abstract getAllByCampaignIdApplication(
    application: GetAllByCampaignIdApplicationDto,
  ): Promise<Application[]>;

  abstract getByUserIdApplication(
    application: GetByUserIdApplicationDto,
  ): Promise<Application[]>;

  abstract getByUserIdPaginationApplication(
    application: GetByUserIdPaginationApplicationDto,
  ): Promise<Application[]>;
}

import {
  ApplicationDto,
  GetApplicationDto,
  GetAllApplicationsDto,
  UpdateApplicationDto,
  GetByCampaignIdWithPaginationDto,
  GetByCampaignIdDto,
  GetByUserIdApplicationDto,
  GetByUserIdPaginationApplicationDto,
} from '../dto';
import { Application } from '../entity';

export abstract class ApplicationRepository {
  abstract createApplication(application: ApplicationDto): Promise<Application>;

  abstract getApplication(
    application: GetApplicationDto,
  ): Promise<Application | null>;

  abstract getAllApplication(
    application: GetAllApplicationsDto,
  ): Promise<Application[]>;

  abstract updateApplication(
    application: UpdateApplicationDto,
  ): Promise<Application | null>;

  abstract getByCampaignIdApplication(
    application: GetByCampaignIdWithPaginationDto,
  ): Promise<Application[] | null>;

  abstract getAllByCampaignIdApplication(
    application: GetByCampaignIdDto,
  ): Promise<Application[] | null>;

  abstract getByUserIdApplication(
    application: GetByUserIdApplicationDto,
  ): Promise<Application[] | null>;

  abstract getByUserIdPaginationApplication(
    application: GetByUserIdPaginationApplicationDto,
  ): Promise<Application[] | null>;
}

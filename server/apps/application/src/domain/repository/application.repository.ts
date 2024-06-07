import {
  CreateApplicationDto,
  GetApplicationByIdDto,
  GetAllApplicationsDto,
  UpdateApplicationDto,
  GetByCampaignIdWithPaginationDto,
  GetByCampaignIdDto,
  GetByUserIdApplicationDto,
  GetByUserIdPaginationApplicationDto,
} from '../dto';
import { Application } from '../entity';

export abstract class ApplicationRepository {
  abstract save(application: Application): Promise<void>;

  abstract getNextId(): Promise<Application['id']>;

  abstract getById(
    application: GetApplicationByIdDto,
  ): Promise<Application | null>;

  abstract getAllApplication(
    application: GetAllApplicationsDto,
  ): Promise<Application[]>;

  abstract updateApplication(
    application: UpdateApplicationDto,
  ): Promise<Application | null>;

  abstract getByCampaignIdApplicationWithPagination(
    application: GetByCampaignIdWithPaginationDto,
  ): Promise<Application[] | null>;

  abstract getByCampaignIdApplication(
    application: GetByCampaignIdDto,
  ): Promise<Application[] | null>;

  abstract getByUserIdApplication(
    application: GetByUserIdApplicationDto,
  ): Promise<Application[] | null>;

  abstract getByUserIdPaginationApplication(
    application: GetByUserIdPaginationApplicationDto,
  ): Promise<Application[] | null>;
}

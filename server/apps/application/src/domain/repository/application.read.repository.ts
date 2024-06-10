import { GetAllApplicationsDto, GetApplicationByIdDto, GetByCampaignIdDto, GetByCampaignIdWithPaginationDto, GetByUserIdApplicationDto, GetByUserIdPaginationApplicationDto, UpdateApplicationDto } from "../dto";
import { Application } from "../entity";

export abstract class ApplicationReadRepository {
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
import { Injectable } from '@nestjs/common';
import { ApplicationDomain } from '../domain/application.application';
import {
  GetAllApplicationsDto,
  GetApplicationByIdDto,
  GetByCampaignIdDto,
  GetByCampaignIdWithPaginationDto,
  GetByUserIdApplicationDto,
  GetByUserIdPaginationApplicationDto,
} from '../domain/dto';

@Injectable()
export class QueryService {
  constructor(private readonly applicationDomain: ApplicationDomain) {}

  async getApplication(request: GetApplicationByIdDto) {
    return await this.applicationDomain.getApplication(request);
  }

  async getAllApplication(request: GetAllApplicationsDto) {
    return await this.applicationDomain.getAllApplication(request);
  }

  async getByCampaignIdApplication(request: GetByCampaignIdWithPaginationDto) {
    return await this.applicationDomain.getByCampaignIdApplication(request);
  }

  async getAllByCampaignIdApplication(request: GetByCampaignIdDto) {
    return await this.applicationDomain.getAllByCampaignIdApplication(request);
  }

  async getByUserIdApplication(request: GetByUserIdApplicationDto) {
    return await this.applicationDomain.getByUserIdApplication(request);
  }

  async getByUserIdPaginationApplication(
    request: GetByUserIdPaginationApplicationDto,
  ) {
    return await this.applicationDomain.getByUserIdPaginationApplication(
      request,
    );
  }
}

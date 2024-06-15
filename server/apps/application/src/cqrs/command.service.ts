import { Injectable } from '@nestjs/common';
import { ApplicationDomain } from '../domain/application.application';
import {
  CreateApplicationDto,
  DeleteByCampaignIdDto,
  UpdateApplicationDto,
} from '../domain/dto';

@Injectable()
export class CommandService {
  constructor(private readonly applicationDomain: ApplicationDomain) {}
  async createApplication(request: CreateApplicationDto) {
    return await this.applicationDomain.createApplication(request);
  }

  async updateApplication(request: UpdateApplicationDto) {
    return await this.applicationDomain.updateApplication(request);
  }

  async delApplicationbyCampaign(request: DeleteByCampaignIdDto) {
    return await this.applicationDomain.delApplicationbyCampaign(request);
  }
}

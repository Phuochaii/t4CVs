import {
  CreateApplicationDto,
  GetApplicationDto,
  GetAllApplicationsDto,
  UpdateApplicationDto,
  GetByCampaignIdApplicationDto,
  GetAllByCampaignIdApplicationDto,
} from './dto';
import {
  CreateApplicationService,
  GetApplicationService,
  GetAllApplicationService,
  UpdateApplicationService,
  GetByCampaignIdApplicationService,
  GetAllByCampaignIdApplicationService,
} from './service';
import { Application } from './entity';

export class ApplicationApplication {
  constructor(
    private readonly createApplicationService: CreateApplicationService,
    private readonly getApplicationService: GetApplicationService,
    private readonly getAllApplicationService: GetAllApplicationService,
    private readonly getByCampaignIdApplicationService: GetByCampaignIdApplicationService,
    private readonly updateApplicationService: UpdateApplicationService,
    private readonly getAllByCampaignIdApplicationService: GetAllByCampaignIdApplicationService,
  ) {}

  async createApplication(request: CreateApplicationDto): Promise<Application> {
    return await this.createApplicationService.execute(request);
  }

  async getApplication(request: GetApplicationDto): Promise<Application> {
    return await this.getApplicationService.execute(request);
  }

  async getAllApplication(
    request: GetAllApplicationsDto,
  ): Promise<Application[]> {
    return await this.getAllApplicationService.execute(request);
  }

  async getByCampaignIdApplication(
    request: GetByCampaignIdApplicationDto,
  ): Promise<Application[]> {
    return await this.getByCampaignIdApplicationService.execute(request);
  }

  async updateApplication(request: UpdateApplicationDto): Promise<Application> {
    return await this.updateApplicationService.execute(request);
  }

  async getAllByCampaignIdApplication(
    request: GetAllByCampaignIdApplicationDto,
  ): Promise<Application[]> {
    return await this.getAllByCampaignIdApplicationService.execute(request);
  }
}

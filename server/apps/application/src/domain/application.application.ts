import {
  CreateApplicationDto,
  GetApplicationDto,
  GetAllApplicationsDto,
  UpdateApplicationDto,
} from './dto';
import {
  CreateApplicationService,
  GetApplicationService,
  GetAllApplicationService,
  UpdateApplicationService,
} from './service';
import { Application } from './entity';

export class ApplicationApplication {
  constructor(
    private readonly createApplicationService: CreateApplicationService,
    private readonly getApplicationService: GetApplicationService,
    private readonly getAllApplicationService: GetAllApplicationService,
    private readonly updateApplicationService: UpdateApplicationService,
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

  async updateApplication(request: UpdateApplicationDto): Promise<Application> {
    return await this.updateApplicationService.execute(request);
  }
}

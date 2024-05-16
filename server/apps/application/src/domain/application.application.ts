import {
  CreateApplicationDto,
  GetApplicationDto,
  GetAllApplicationsDto,
} from './dto';
import {
  CreateApplicationService,
  GetApplicationService,
  GetAllApplicationService,
} from './service';
import { Application } from './entity';

export class ApplicationApplication {
  constructor(
    private readonly createApplicationService: CreateApplicationService,
    private readonly getApplicationService: GetApplicationService,
    private readonly getAllApplicationService: GetAllApplicationService,
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
}

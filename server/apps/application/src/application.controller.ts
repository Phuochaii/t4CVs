import { Controller } from '@nestjs/common';
import { ApplicationService } from './application.service';
import {
  Application,
  ApplicationServiceController,
  ApplicationServiceControllerMethods,
  CreateApplicationRequest,
  ReadApplicationRequest,
} from '@app/common';

@Controller()
@ApplicationServiceControllerMethods()
export class ApplicationController implements ApplicationServiceController {
  constructor(private readonly applicationService: ApplicationService) {}

  async createApplication(
    createApplication: CreateApplicationRequest,
  ): Promise<Application> {
    // Use Promise<Application> as return type
    const application = await this.applicationService.create(createApplication);
    return application;
  }

  findAllUsers() {
    return this.applicationService.findAll();
  }

  async readApplication(
    readApplication: ReadApplicationRequest,
  ): Promise<Application> {
    const application = await this.applicationService.findById(readApplication);
    if (application) {
      return application;
    }
    return null;
  }
}

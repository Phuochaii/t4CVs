import { Controller } from '@nestjs/common';
import { ApplicationService } from './application.service';
import {
  ApplicationServiceController,
  ApplicationServiceControllerMethods,
  // CreateApplicationDTO,
  // UpdateApplicationDTO,
  CreateApplicationRequest,
} from '@app/common';

@Controller()
@ApplicationServiceControllerMethods()
export class ApplicationController implements ApplicationServiceController {
  constructor(private readonly applicationService: ApplicationService) {}

  createUser(createApplication: CreateApplicationRequest) {
    return this.applicationService.create(createApplication);
  }

  findAllUsers() {
    return this.applicationService.findAll();
  }
}

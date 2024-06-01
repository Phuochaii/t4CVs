import { Controller } from '@nestjs/common';
import {
  ApplicationServiceController,
  ApplicationServiceControllerMethods,
  Applications,
  CreateApplicationRequest,
  DeleteApplicationRequest,
  ReadApplicationRequest,
  UpdateApplicationRequest,
  Pagination,
  ReadAllApplicationByCampaignIdRequest,
  ReadAllApplicationByUserIdRequest,
} from '@app/common/proto/application';
import { ApplicationApplication } from './domain/application.application';

@Controller()
@ApplicationServiceControllerMethods()
export class ApplicationController implements ApplicationServiceController {
  constructor(
    private readonly applicationApplication: ApplicationApplication,
  ) {}

  createApplication(request: CreateApplicationRequest) {
    const res = this.applicationApplication.createApplication(request);
    return res;
  }

  readApplication(request: ReadApplicationRequest) {
    const res = this.applicationApplication.getApplication(request);
    return res;
  }

  async readAllApplicationByCampaignId(
    request: ReadAllApplicationByCampaignIdRequest,
  ) {
    return await this.applicationApplication.getByCampaignIdApplication(
      request,
    );
  }

  async readAllApplicationByUserId(request: ReadAllApplicationByUserIdRequest) {
    return await this.applicationApplication.getByUserIdPaginationApplication(
      request,
    );
  }

  async readAllApplication(request: Pagination): Promise<Applications> {
    request;
    return null;
  }

  updateApplication(request: UpdateApplicationRequest) {
    return this.applicationApplication.updateApplication(request);
  }

  deleteApplication(request: DeleteApplicationRequest) {
    request;
    return null;
  }
}

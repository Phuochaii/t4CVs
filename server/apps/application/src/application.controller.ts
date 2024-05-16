import { Controller } from '@nestjs/common';
// import { ApplicationService } from './old/application.service';
// import { GrpcMethod } from '@nestjs/microservices';
// import { CreateApplicationDto } from './dto/create-application.dto';
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
    // console.log(cre);
    return res;
  }

  async readAllApplicationByCampaignId(
    request: ReadAllApplicationByCampaignIdRequest,
  ): Promise<Applications> {
    return null;
  }

  async readAllApplicationByUserId(
    request: ReadAllApplicationByUserIdRequest,
  ): Promise<Applications> {
    return null;
  }

  async readAllApplication(request: Pagination): Promise<Applications> {
    return null;
  }

  updateApplication(request: UpdateApplicationRequest) {
    return this.applicationApplication.updateApplication(request);
  }

  deleteApplication(request: DeleteApplicationRequest) {
    return null;
  }
}

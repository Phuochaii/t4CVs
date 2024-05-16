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
// import { Observable } from 'rxjs';
// import { PaginationRequest } from '@app/common/dto/pagination';
// import { DateTimestampConverter } from '@app/common/conveters';
import { ApplicationApplication } from './domain/application.application';
// import { UserNotificationAggregate } from './domain/aggregate';

@Controller()
@ApplicationServiceControllerMethods()
export class ApplicationController implements ApplicationServiceController {
  constructor(
    private readonly applicationApplication: ApplicationApplication,
  ) {}

  // createApplication(request: CreateApplicationRequest) {
  //   return this.applicationService.store(request);
  // }

  createApplication(request: CreateApplicationRequest) {
    const res = this.applicationApplication.createApplication(request);
    // console.log(cre);
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
    return null;
  }

  deleteApplication(request: DeleteApplicationRequest) {
    return null;
  }
}

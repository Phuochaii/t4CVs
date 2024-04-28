import { Controller } from '@nestjs/common';
import { ApplicationService } from './application.service';
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
} from '@app/common/proto/application';

@Controller()
@ApplicationServiceControllerMethods()
export class ApplicationController implements ApplicationServiceController {
  constructor(private readonly applicationService: ApplicationService) {}
  createApplication(request: CreateApplicationRequest) {
    return this.applicationService.store(request);
  }

  readApplication(request: ReadApplicationRequest) {
    return this.applicationService.findOneOrFail(request.id);
  }

  async readAllApplicationByCampaignId(
    request: ReadAllApplicationByCampaignIdRequest,
  ): Promise<Applications> {
    const data = await this.applicationService.findAllApplicationByCampaignId(
      request.page,
      request.limit,
      request.campaignIds,
      request.status,
    );
    const total = data.length;
    const total_pages = Math.ceil(total / request.limit);
    return {
      page: request.page,
      limit: request.limit,
      total: total,
      totalPage: total_pages,
      applications: data,
    };
  }

  async readAllApplication(request: Pagination): Promise<Applications> {
    const data = await this.applicationService.findAll(
      request.page,
      request.limit,
    );
    // Calculate pagination metadata
    const total = data.length;
    const total_pages = Math.ceil(total / request.limit);
    return {
      page: request.page,
      limit: request.limit,
      total: total,
      totalPage: total_pages,
      applications: data,
    };
  }

  updateApplication(request: UpdateApplicationRequest) {
    return this.applicationService.update(request.id);
  }

  deleteApplication(request: DeleteApplicationRequest) {
    return this.applicationService.delete(request.id);
  }
}

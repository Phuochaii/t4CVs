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
    // console.log(cre);
    return res;
  }

  async readAllApplicationByCampaignId(
    request: ReadAllApplicationByCampaignIdRequest,
  ): Promise<Applications> {
    const campaignIds = request.campaignIds;
    const total_data =
      this.applicationApplication.getAllByCampaignIdApplication({
        campaignIds,
      });
    // console.log(total_data);
    const total = (await total_data).length;
    const data =
      await this.applicationApplication.getByCampaignIdApplication(request);
    // console.log(total);

    const total_pages = Math.ceil(total / request.limit);
    return {
      page: request.page,
      limit: request.limit,
      total: total,
      totalPage: total_pages,
      applications: data,
    };
  }

  async readAllApplicationByUserId(
    request: ReadAllApplicationByUserIdRequest,
  ): Promise<Applications> {
    const userId = request.userId;
    const total_data = this.applicationApplication.getByUserIdApplication({
      userId,
    });
    const total = (await total_data).length;
    const data =
      await this.applicationApplication.getByUserIdPaginationApplication(
        request,
      );

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
    return null;
  }

  updateApplication(request: UpdateApplicationRequest) {
    return this.applicationApplication.updateApplication(request);
  }

  deleteApplication(request: DeleteApplicationRequest) {
    return null;
  }
}

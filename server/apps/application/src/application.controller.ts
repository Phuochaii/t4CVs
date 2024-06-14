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
import { CommandService } from './cqrs/command.service';
import { QueryService } from './cqrs/query.service';

@Controller()
@ApplicationServiceControllerMethods()
export class ApplicationController implements ApplicationServiceController {
  constructor(
    private readonly commandService: CommandService,
    private readonly queryService: QueryService,
  ) {}

  createApplication(request: CreateApplicationRequest) {
    const res = this.commandService.createApplication(request);
    return res;
  }

  readApplication(request: ReadApplicationRequest) {
    const res = this.queryService.getApplication(request);
    return res;
  }

  async readAllApplicationByCampaignId(
    request: ReadAllApplicationByCampaignIdRequest,
  ) {
    return await this.queryService.getByCampaignIdApplication(request);
  }

  async readAllApplicationByUserId(request: ReadAllApplicationByUserIdRequest) {
    return await this.queryService.getByUserIdPaginationApplication(request);
  }

  async readAllApplication(request: Pagination): Promise<Applications> {
    request;
    return null;
  }

  updateApplication(request: UpdateApplicationRequest) {
    return this.commandService.updateApplication(request);
  }

  deleteApplication(request: DeleteApplicationRequest) {
    request;
    return null;
  }
}

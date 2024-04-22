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
} from '@app/common';
import { Observable } from 'rxjs';

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

  async readAllApplication(request: Pagination): Promise<Applications> {
    // console.log(this.applicationService.findAll());
    const data = await this.applicationService.findAll(
      request.page,
      request.limit,
    );
    return { applications: data };
  }

  updateApplication(request: UpdateApplicationRequest) {
    return this.applicationService.update(request.id);
  }

  deleteApplication(request: DeleteApplicationRequest) {
    return this.applicationService.delete(request.id);
  }
}

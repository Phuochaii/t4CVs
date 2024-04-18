import { Controller } from '@nestjs/common';
import { ApplicationService } from './application.service';
// import { GrpcMethod } from '@nestjs/microservices';
// import { CreateApplicationDto } from './dto/create-application.dto';
import {
  Application,
  ApplicationServiceController,
  ApplicationServiceControllerMethods,
  CreateApplicationRequest,
  DeleteApplicationRequest,
  Empty,
  ReadApplicationRequest,
  UpdateApplicationRequest,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@ApplicationServiceControllerMethods()
export class ApplicationController implements ApplicationServiceController {
  constructor(private readonly applicationService: ApplicationService) {}
  createApplication(create: CreateApplicationRequest) {
    return this.applicationService.store(create);
  }

  readApplication(findOne: ReadApplicationRequest) {
    return this.applicationService.findOneOrFail(findOne.id);
  }

  // async readAllApplication(): Promise<Application[]> {
  //   return await this.applicationService.findAll();
  // }

  readAllApplication(): Observable<Application> {
    return this.applicationService.findAll();
  }

  updateApplication(update: UpdateApplicationRequest) {
    return this.applicationService.update(update.id);
  }

  deleteApplication(request: DeleteApplicationRequest) {
    return this.applicationService.delete(request.id);
  }
}

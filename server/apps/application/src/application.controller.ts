import { Controller } from '@nestjs/common';
import { ApplicationService } from './application.service';
// import { GrpcMethod } from '@nestjs/microservices';
// import { CreateApplicationDto } from './dto/create-application.dto';
import {
  Application,
  ApplicationServiceController,
  ApplicationServiceControllerMethods,
  Applications,
  CreateApplicationRequest,
  DeleteApplicationRequest,
  ReadApplicationRequest,
  UpdateApplicationRequest,
} from '@app/common';
// import { Application } from './entities/application.entity';
// import { Observable } from 'rxjs';

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

  // async readAllApplication(): Promise<Applications> {
  //   // console.log(this.applicationService.findAll());
  //   const data = await this.applicationService.findAll();
  //   console.log('service apply');
  //   console.log(data);
  //   return { Applications: data };
  // }

  async readAllApplication(): Promise<Applications> {
    // console.log(this.applicationService.findAll());
    const data = await this.applicationService.findAll();
    console.log('controller not gateway apply');
    console.log({ Applications: data });
    return { applications: data };
  }

  updateApplication(request: UpdateApplicationRequest) {
    return this.applicationService.update(request.id);
  }

  deleteApplication(request: DeleteApplicationRequest) {
    return this.applicationService.delete(request.id);
  }
}

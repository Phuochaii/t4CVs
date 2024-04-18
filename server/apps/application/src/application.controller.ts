import { Controller } from '@nestjs/common';
import { ApplicationService } from './application.service';
// import { GrpcMethod } from '@nestjs/microservices';
// import { CreateApplicationDto } from './dto/create-application.dto';
import {
  Application,
  ApplicationServiceController,
  ApplicationServiceControllerMethods,
  CreateApplicationRequest,
  ReadApplicationRequest,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@ApplicationServiceControllerMethods()
// export class ApplicationController {
//   constructor(private applicationService: ApplicationService) {}

//   @GrpcMethod('ApplicationService', 'CreateApplication')
//   async Create(data: CreateApplicationDto) {
//     console.log(data);
//     return await this.applicationService.store(data);
//   }
//   @GrpcMethod('ApplicationService', 'ReadApplication')
//   async Show(data: { id: number }) {
//     const { id } = data;
//     const data1 = await this.applicationService.findOneOrFail(id);
//     return data1;
//     // return await this.applicationService.findAll();
//   }
// }
export class ApplicationController implements ApplicationServiceController {
  constructor(private readonly applicationService: ApplicationService) {}
  createApplication(create: CreateApplicationRequest) {
    return this.applicationService.store(create);
  }

  readApplication(findOne: ReadApplicationRequest) {
    return this.applicationService.findOneOrFail(findOne.id);
  }
}

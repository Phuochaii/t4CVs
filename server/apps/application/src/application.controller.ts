import { Controller } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateApplicationDto } from './dto/create-application.dto';
// import { UpdateApplicationDto } from './dto/update-application.dto';
// import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
// @ApplicationServiceControllerMethods()
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  // createApplication(createApplication: CreateApplicationRequest) {
  //   return this.applicationService.create(createApplication);
  // }

  // findOneApplication(readApplication: ReadApplicationRequest) {
  //   return this.applicationService.findOneApplication(readApplication);
  // }

  // async readApplication(
  //   readApplication: ReadApplicationRequest,
  // ): Promise<Application> {
  //   const application = await this.applicationService.findById(readApplication);
  //   if (application) {
  //     return application;
  //   }
  //   return null;
  // }

  @GrpcMethod('ApplicationService', 'CreateApplication')
  async Create(data: CreateApplicationDto) {
    console.log(data);
    return await this.applicationService.store(data);
  }

  @GrpcMethod('ApplicationService', 'ReadApplication')
  async Show(data: { id: number }) {
    const { id } = data;
    return await this.applicationService.findOneOrFail(id);
  }
}

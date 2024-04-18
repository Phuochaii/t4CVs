import { Controller } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller()
// @ApplicationServiceControllerMethods()
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @GrpcMethod('ApplicationService', 'CreateApplication')
  async Create(data: CreateApplicationDto) {
    console.log(data);
    return await this.applicationService.store(data);
  }
  @GrpcMethod('ApplicationService', 'ReadApplication')
  async Show(data: { id: number }) {
    const { id } = data;
    const data1 = await this.applicationService.findOneOrFail(id);
    return data1;
    // return await this.applicationService.findAll();
  }
}

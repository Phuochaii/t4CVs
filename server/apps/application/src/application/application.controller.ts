import { Controller } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateApplicationDto } from './application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @MessagePattern({ cmd: 'add-application' })
  async addApplication(@Payload() createApplicationDto: CreateApplicationDto) {
    return await this.applicationService.addApplication(createApplicationDto);
  }

  @MessagePattern({ cmd: 'get-all-application' })
  async getAllSubscriber() {
    return await this.applicationService.getAllApplication();
  }

  //   @MessagePattern({ cmd: 'get-all-subscriber' })
  //   async getAllApplication() {
  //     return await this.subscriberService.getAllApplication();
  //   }

  //   @EventPattern({ cmd: 'add-subsscriber' })
  //   async addSubscriberEvent(createApplicationDto: CreateApplicationDto) {
  //     return this.subscriberService.addSubscriber(createApplicationDto);
  //   }

  //   @GrpcMethod('ApplicationService', 'AddSubscriber')
  //   async addApplicationGrpcMethod(createApplicationDto: CreateApplicationDto) {
  //     return this.subscriberService.addApplication(createApplicationDto);
  //   }

  //   @GrpcMethod('ApplicationService', 'GetAllSubscribers')
  //   async getAllApplicationGrpcMethod() {
  //     return {
  //       data: await this.subscriberService.getAllApplication(),
  //     };
  //   }
}

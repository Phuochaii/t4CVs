import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateApplicationRequest,
  APPLICATION_PACKAGE_NAME,
  ApplicationServiceClient,
  APPLICATION_SERVICE_NAME,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ApplicationService implements OnModuleInit {
  private applicationServiceClient: ApplicationServiceClient;

  // @Inject(APPLICATION_PACKAGE_NAME)
  // private readonly client: ClientGrpc;
  constructor(
    @Inject(APPLICATION_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.applicationServiceClient =
      this.client.getService<ApplicationServiceClient>(
        APPLICATION_SERVICE_NAME,
      );
  }

  create(createApplicationRequest: CreateApplicationRequest) {
    return this.applicationServiceClient.createApplication(
      createApplicationRequest,
    );
  }

  // findAll() {
  //   return this.applicationServiceClient.readApplication({});
  // }

  findOne(id: number) {
    return this.applicationServiceClient.readApplication({ id });
    // return `This action updates a #${id} application`;
  }

  // update(id: number, updateApplicationDto: UpdateApplicationDto) {
  //   return `This action updates a #${id} application`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} application`;
  // }
}

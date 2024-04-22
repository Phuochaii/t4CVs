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
  private readonly application: any[] = [];
  private applicationServiceClient: ApplicationServiceClient;

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
    console.log(createApplicationRequest);
    return this.applicationServiceClient.createApplication(
      createApplicationRequest,
    );
  }

  findOne(id: number) {
    return this.applicationServiceClient.readApplication({ id });
  }

  findAll(page: number, limit: number) {
    const applications$ = this.applicationServiceClient.readAllApplication({
      page,
      limit,
    });
    return applications$;
  }

  async update(id: number) {
    const data = await this.applicationServiceClient.updateApplication({ id });
    return data;
  }
}

import { APPLICATION_PACKAGE_NAME, APPLICATION_SERVICE_NAME, ApplicationServiceClient, CreateApplicationRequest } from '@app/common/proto/application';
import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
// import { Observable, from, throwError, toArray } from 'rxjs';
// import { catchError, map, mergeAll } from 'rxjs/operators';

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

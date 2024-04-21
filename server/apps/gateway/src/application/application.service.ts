import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import {
  CreateApplicationRequest,
  APPLICATION_PACKAGE_NAME,
  ApplicationServiceClient,
  APPLICATION_SERVICE_NAME,
  Application,
  Applications,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { toArray } from 'rxjs';
// import { Observable, from } from 'rxjs';
// import { mergeMap } from 'rxjs/operators';

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

  // findAll() {
  //   return this.applicationServiceClient.readAllApplication({});
  // }
  findAll() {
    const applications$ = this.applicationServiceClient
      .readAllApplication({})
      .pipe(toArray());
    return applications$;
    // applications$.subscribe({
    //   next(application) {
    //     console.log(application);
    //   },
    //   error(err) {
    //     console.error('Error: ' + err);
    //   },
    //   complete() {
    //     console.log('Completed');
    //   },
    // });
  }

  async update(id: number) {
    const data = await this.applicationServiceClient.updateApplication({ id });
    return data;
  }

  // update(id: number, updateApplicationDto: UpdateApplicationDto) {
  //   return `This action updates a #${id} application`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} application`;
  // }
}

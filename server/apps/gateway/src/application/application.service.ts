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
} from '@app/common';
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


  async findAll() {
    try {
      let applications;
      this.applicationServiceClient.readAllApplication({}).subscribe(
        (data) => {
          applications = data;
          console.log(applications);
        },
        (error) => {
          console.log('Lỗi:', error);
          throw new NotFoundException(error.message);
        },
      );
      return {
        application: applications,
      };
    } catch (error) {
      console.log('Lỗi:', error);
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number) {
    return this.applicationServiceClient.updateApplication({ id });
  }

  // update(id: number, updateApplicationDto: UpdateApplicationDto) {
  //   return `This action updates a #${id} application`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} application`;
  // }
}

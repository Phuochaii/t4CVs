import {
  APPLICATION_PACKAGE_NAME,
  APPLICATION_SERVICE_NAME,
  ApplicationServiceClient,
  CreateApplicationRequest,
} from '@app/common/proto/application';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { CVService } from '../cv/cv.service';
import { firstValueFrom } from 'rxjs';
import {
  NotificationService,
  NotificationUserId,
  NotificationUserRole,
} from '../notification/notification.service';
import { EmployerService } from '../employer/employer.service';
import { CVDto } from '../cv/dto/cv.dto';
import { CompanyService } from '../company/company.service';
import { JobService } from '../job/job.service';

@Injectable()
export class ApplicationService implements OnModuleInit {
  private readonly application: any[] = [];
  private applicationServiceClient: ApplicationServiceClient;

  constructor(
    @Inject(APPLICATION_PACKAGE_NAME) private readonly client: ClientGrpc,
    private readonly cvService: CVService,
    private readonly notificationService: NotificationService,
    private readonly employerService: EmployerService,
    private readonly companyService: CompanyService,
    private readonly jobService: JobService,
  ) {}

  onModuleInit() {
    this.applicationServiceClient =
      this.client.getService<ApplicationServiceClient>(
        APPLICATION_SERVICE_NAME,
      );
  }

  async create(createApplicationRequest: CreateApplicationRequest) {
    const application = await firstValueFrom(
      this.applicationServiceClient.createApplication(createApplicationRequest),
    );
    const campaign = await firstValueFrom(
      this.companyService.findCampaignById(createApplicationRequest.campaignId),
    );
    const employerId = campaign.employerId;

    await firstValueFrom(
      this.notificationService.create(
        [new NotificationUserId(employerId, NotificationUserRole.HR)],
        {
          content: `Ứng viên ${application.fullname}- ${campaign.name}`,
          link: `application/${application.id}`,
          title: `CV mới ứng tuyển`,
        },
      ),
    );
    return application;
  }

  findOne(id: number) {
    return this.applicationServiceClient.readApplication({ id });
  }

  findAll(
    page: number,
    limit: number,
    campaignIds: number[],
    status: boolean | null,
  ) {
    const applications$ =
      this.applicationServiceClient.readAllApplicationByCampaignId({
        page,
        limit,
        campaignIds,
        status,
      });
    return applications$;
  }

  async findAllByUserId(
    page: number,
    limit: number,
    userId: string,
    status: boolean | null,
  ) {
    const { applications = [], ...data } = await firstValueFrom(
      this.applicationServiceClient.readAllApplicationByUserId({
        page,
        limit,
        userId,
        status,
      }),
    );
    const cvIds = applications.map((application) => application.cvId);
    console.log(cvIds);
    const cvs = await firstValueFrom(this.cvService.getCVsById(cvIds));
    console.log(cvs);

    const arrayCV = cvs.map((cv) => cv.link);
    console.log(arrayCV);

    const ApplicationsWithLinkCV = applications.map((application, index) => {
      const cvLink = arrayCV[index];
      return { ...application, link: cvLink };
    });
    return {
      ...data,
      ApplicationsWithLinkCV,
    };
  }

  async update(id: number) {
    const data = await firstValueFrom(
      this.applicationServiceClient.updateApplication({ id }),
    );

    return data;
  }

  async hrGetCv(id: number) {
    const application = await this.update(id);
    const cv = (await firstValueFrom(
      this.cvService.getCVById(application.cvId),
    )) as CVDto;
    const campaign = await firstValueFrom(
      this.companyService.findCampaignById(application.campaignId),
    );
    const employer = await firstValueFrom(
      this.employerService.findEmployerById(campaign.employerId),
    );
    const campany = await firstValueFrom(
      this.companyService.findCompanyById(employer.companyId),
    );
    const job = await this.jobService.findJobByCampaignId(campaign.id);

    const notification = await firstValueFrom(
      this.notificationService.create(
        [new NotificationUserId(cv.userId, NotificationUserRole.USER)],
        {
          content: `${employer.fullname} - ${campany.name} vừa xem CV của bạn`,
          link: `job/${job.id}`,
          title: `Nhà tuyển dụng vừa xem CV của bạn`,
        },
      ),
    );
    return cv;
  }
}

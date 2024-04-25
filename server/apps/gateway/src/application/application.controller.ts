import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CompanyService } from '../company/company.service';
import {
  NotificationService,
  NotificationUserId,
  NotificationUserRole,
} from '../notification/notification.service';
import { CreateApplicationRequest } from '@app/common/proto/application';
import {
  GetUserNotificationsRequest,
  NOTIFICATION_PACKAGE_NAME,
  NOTIFICATION_SERVICE_NAME,
  NotificationServiceClient,
  SendNotificationRequest,
  status,
} from '@app/common/proto/notification';

@Controller('application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly companyService: CompanyService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  create(@Body() createApplicationRequest: CreateApplicationRequest) {
    console.log(createApplicationRequest.campaignId);
    this.applicationService
      .create(createApplicationRequest)
      .subscribe((application: any) => {
        this.companyService.findCampaignById(5).subscribe((value: any) => {
          const employerId = value.employerId;
          this.notificationService.create(
            [new NotificationUserId(employerId, NotificationUserRole.HR)],
            {
              content: `Ứng viên - ${value.name}`,
              link: `application/${application.id}`,
              title: `CV mới ứng tuyển`,
            },
          );
        });
      });

    return this.applicationService.create(createApplicationRequest);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    let campaignId;
    const result = await this.applicationService.findOne(id);
    this.applicationService.findOne(id).subscribe((value) => {
      console.log(value);
      campaignId = value.fullname;
      console.log('123');
      console.log(campaignId);
    });

    return result;
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.applicationService.findAll(page, limit);
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.applicationService.update(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.applicationService.remove(+id);
  // }
}

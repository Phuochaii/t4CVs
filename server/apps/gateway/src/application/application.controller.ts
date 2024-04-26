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
import { UserService } from '../user/user.service';

@Controller('application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly companyService: CompanyService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createApplicationRequest: CreateApplicationRequest) {
    // console.log(createApplicationRequest.campaignId);
    this.applicationService
      .create(createApplicationRequest)
      .subscribe((application: any) => {
        this.companyService
          .findCampaignById(createApplicationRequest.campaignId)
          .subscribe((campaign: any) => {
            const employerId = campaign.employerId;
            this.userService
              .findJobById(createApplicationRequest.userId)
              .subscribe((user: any) => {
                this.notificationService.create(
                  [new NotificationUserId(employerId, NotificationUserRole.HR)],
                  {
                    content: `Ứng viên ${user.fullname} - ${campaign.name}`,
                    link: `application/${application.id}`,
                    title: `CV mới ứng tuyển`,
                  },
                );
              });
          });
      });
    return this.applicationService.create(createApplicationRequest);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    // let campaignId;
    // const result = await this.applicationService.findOne(id);
    // this.applicationService.findOne(id).subscribe((value) => {
    //   // console.log(value);
    //   campaignId = value.fullname;
    //   // console.log('123');
    //   // console.log(campaignId);
    // });
    // console.log(campaignId);

    // return result;
    const result = await this.applicationService.findOne(id).toPromise();
    let campaignId;

    await this.applicationService
      .findOne(id)
      .toPromise()
      .then((value) => {
        campaignId = value.fullname;
      });

    console.log(campaignId);

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

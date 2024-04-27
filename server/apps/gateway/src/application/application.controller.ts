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
import { UserService } from '../user/user.service';
import {
  NotificationService,
  NotificationUserId,
  NotificationUserRole,
} from '../notification/notification.service';
import { CreateApplicationRequest } from '@app/common/proto/application';
import { firstValueFrom } from 'rxjs';

// import { firstValueFrom } from 'rxjs';

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
    //application campagin  user notification
    // this.applicationService
    //   .create(createApplicationRequest)
    //   .subscribe((application: any) => {
    //     this.companyService
    //       .findCampaignById(createApplicationRequest.campaignId)
    //       .subscribe((campaign: any) => {
    //         const employerId = campaign.employerId;
    //         this.userService
    //           .findJobById(createApplicationRequest.userId)
    //           .subscribe((user: any) => {
    //             this.notificationService.create(
    //               [new NotificationUserId(employerId, NotificationUserRole.HR)],
    //               {
    //                 content: `Ứng viên ${user.fullname} - ${campaign.name}`,
    //                 link: `application/${application.id}`,
    //                 title: `CV mới ứng tuyển`,
    //               },
    //             );
    //           });
    //       });
    //   });
    // const application = await firstValueFrom(
    //   this.applicationService.create(createApplicationRequest),
    // );

    // const campaign = await firstValueFrom(
    //   this.companyService.findCampaignById(createApplicationRequest.campaignId),
    // );
    // const employerId = campaign.employerId;

    // // const user = await firstValueFrom(
    // //   this.userService.findJobById(createApplicationRequest.userId),
    // // );

    // console.log(employerId);
    const notification = await this.notificationService.create(
      [new NotificationUserId(123, NotificationUserRole.HR)],
      {
        content: `Ứng viên`,
        link: `application`,
        title: `CV mới ứng tuyển`,
      },
    );
    console.log(notification);

    return 'success';
  }

  @Get('/hr/:hrId')
  async findAll(
    @Param('hrId') hrId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('campaignId') campaignId: number | null,
    @Query('status') status: boolean | null, //truyen vao false or null //filter
  ) {
    const campaignRes = await firstValueFrom(
      this.companyService.findCampaignByEmployerId(hrId),
    );
    const campaignIds = [];
    let id;
    let n = 0;
    while (campaignRes[n]) {
      id = campaignRes[n].id;
      campaignIds.push(id);
      n++;
    }
    if (campaignId) {
      campaignIds.forEach((element) => {
        if (element.campaignId == campaignId) {
          const campaignIds_one = [];
          campaignIds_one.push(campaignId);
          return this.applicationService.findAll(
            page,
            limit,
            campaignIds_one,
            status,
          );
        }
      });
    }
    console.log(status);

    return this.applicationService.findAll(page, limit, campaignIds, status);
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

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.applicationService.update(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.applicationService.remove(+id);
  // }
}

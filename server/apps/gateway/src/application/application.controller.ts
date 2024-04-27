import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ForbiddenException,
  ParseBoolPipe,
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
    const application = await firstValueFrom(
      this.applicationService.create(createApplicationRequest),
    );

    const campaign = await firstValueFrom(
      this.companyService.findCampaignById(createApplicationRequest.campaignId),
    );
    const employerId = campaign.employerId;

    // console.log(employerId);
    const notification = await firstValueFrom(this.notificationService.create(
      [new NotificationUserId(123, NotificationUserRole.HR)],
      {
        content: `Ứng viên ${application.fullname}- ${campaign.name}`,
        link: `application/${application.id}`,
        title: `CV mới ứng tuyển`,
      },
    ));
    return application;
  }

  @Get('/hr/:hrId')
  async findAll(
    @Param('hrId') hrId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('campaignId') campaignId: number | null,
    @Query(
      'status',
      new ParseBoolPipe({
        optional: true,
      }),
    )
    status: boolean | null, //truyen vao false or null //filter
  ) {
    const campaignRes = await firstValueFrom(
      this.companyService.findCampaignByEmployerId(hrId, 1, 100),
    );
    console.log(campaignRes);
    let campaignIds = campaignRes.data.map((campaign) => campaign.id);
    if (campaignId) {
      if (campaignIds.includes(campaignId)) campaignIds = [campaignId];
      else throw new ForbiddenException();
    }

    return this.applicationService.findAll(page, limit, campaignIds, status);
    // return 'success';
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    let campaignId;
    const result = await this.applicationService.findOne(id);
    this.applicationService.findOne(id).subscribe((value) => {
      campaignId = value.fullname;
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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationRequest } from '@app/common/proto/application';

// import { firstValueFrom } from 'rxjs';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(@Body() createApplicationRequest: CreateApplicationRequest) {
<<<<<<< HEAD
    await this.applicationService.create(createApplicationRequest);
=======
    const application = await firstValueFrom(
      this.applicationService.create(createApplicationRequest),
    );

    const campaign = await firstValueFrom(
      this.companyService.findCampaignById(createApplicationRequest.campaignId),
    );
    const employerId = campaign.employerId;

    // console.log(employerId);
    const notification = await firstValueFrom(
      this.notificationService.create(
        [new NotificationUserId(employerId, NotificationUserRole.HR)],
        {
          content: `Ứng viên ${application.fullname}- ${campaign.name}`,
          link: `application/${application.id}`,
          title: `CV mới ứng tuyển`,
        },
      ),
    );
>>>>>>> 80f65bf8591fcdecb03f2f3aa8bdd4d9670c9256
    return 'Success';
  }

  @Get('/hr/:hrId')
  async findAll(
    @Param('hrId') hrId: string,
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
    return this.applicationService.findAll(
      page,
      limit,
      campaignId,
      status,
      hrId,
    );
  }

  @Get('/user/:userId')
  async findAllByUserId(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query(
      'status',
      new ParseBoolPipe({
        optional: true,
      }),
    )
    status: boolean | null,
  ) {
    return this.applicationService.findAllByUserId(page, limit, userId, status);
  }

  @Get(':id/cv')
  hrGetCv(@Param('id') id: number) {
    return this.applicationService.hrGetCv(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.applicationService.findOne(id);
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

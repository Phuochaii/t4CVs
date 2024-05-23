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
import { CompanyService } from '../company/company.service';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';
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
    await this.applicationService.create(createApplicationRequest);
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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseBoolPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationService } from './application.service';
import { CreateApplicationRequest } from '@app/common/proto/application';
import { PermissionsGuard } from '../authorization/permission/permissions.guard';

// import { firstValueFrom } from 'rxjs';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  //create application
  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Post()
  async create(@Body() createApplicationRequest: CreateApplicationRequest) {
    await this.applicationService.create(createApplicationRequest);
    return 'Success';
  }

  //hr get applications by campaignId + hrId
  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
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

  //user get applications
  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
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

  //hr get application's cv
  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Get(':id/cv')
  hrGetCv(@Param('id') id: number) {
    return this.applicationService.hrGetCv(id);
  }

  //get a application
  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.applicationService.findOne(id);
  }

  //hr update status
  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Patch(':id')
  update(@Param('id') id: number, @Body('status') status: boolean) {
    return this.applicationService.update(id, status);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.applicationService.remove(+id);
  // }
}

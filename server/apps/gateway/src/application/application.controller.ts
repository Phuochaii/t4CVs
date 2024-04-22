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
import { CreateApplicationRequest } from '@app/common/proto/application';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  create(@Body() createApplicationRequest: CreateApplicationRequest) {
    return this.applicationService.create(createApplicationRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.applicationService.findOne(id);
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

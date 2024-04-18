import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationRequest } from '@app/common';

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
  findAll() {
    return this.applicationService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
  //   return this.applicationService.update(+id, updateApplicationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.applicationService.remove(+id);
  // }
}

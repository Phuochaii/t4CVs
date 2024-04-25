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
  async findOne(@Param('id') id: number) {
    // console.log(this.applicationService.findOne(id));
    // return this.applicationService.findOne(id);
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

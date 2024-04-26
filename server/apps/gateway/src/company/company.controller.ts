import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/Req/createCompany.dto';
import { UpdateCompanyDto } from './dto/Req/updateCompany.dto';
import { CreateCampaignDto } from './dto/Req/createCampaign.dto';
import { UpdateCampaignDto } from './dto/Req/updateCampaign.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  createCompany(@Body() data: CreateCompanyDto): Observable<string> {
    return this.companyService.createCompany(data);
  }

  @Get('all')
  getAllCompanies(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<string> {
    return this.companyService.getAllCompanies(page, limit);
  }

  @Get(':id')
  findCompanyById(@Param('id') id: number): Observable<string> {
    return this.companyService.findCompanyById(id);
  }

  @Post('update')
  updateCompany(@Body() data: UpdateCompanyDto): Observable<string> {
    return this.companyService.updateCompany(data);
  }

  @Delete(':id')
  removeCompany(@Param('id') id: number): Observable<string> {
    return this.companyService.removeCompany(id);
  }

  @Post('campaign/create')
  createCampaign(@Body() data: CreateCampaignDto): Observable<string> {
    return this.companyService.createCampaign(data);
  }

  @Get('campaign/all')
  getAllCampaigns(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<string> {
    return this.companyService.getAllCampaigns(page, limit);
  }

  @Get('campaign/:id')
  findCampaignById(@Param('id') id: number): Observable<string> {
    return this.companyService.findCampaignById(id);
  }

  @Post('campaign/update')
  updateCampaign(@Body() data: UpdateCampaignDto): Observable<string> {
    return this.companyService.updateCampaign(data);
  }

  // @Get('campaign/:id/employer')
  // findEmployerId(@Param('id') id: number): Observable<string> {
  //   return this.companyService.findEmployerId(id);
  // }
}

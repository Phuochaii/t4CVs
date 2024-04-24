import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmployerService } from './employer.service';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  // @Post('create')
  // createCompany(@Body() data: CreateCompanyDto): Observable<string> {
  //   return this.companyService.createCompany(data);
  // }

  @Get('all')
  getAllCompanies(): Observable<string> {
    return this.employerService.getAllEmployers();
  }

  @Get(':id')
  findCompanyById(@Param('id') id: number): Observable<string> {
    return this.employerService.findEmployerById(id);
  }

  // @Post('update')
  // updateCompany(@Body() data: UpdateCompanyDto): Observable<string> {
  //   return this.companyService.updateCompany(data);
  // }

  // @Delete(':id')
  // removeCompany(@Param('id') id: number): Observable<string> {
  //   return this.companyService.removeCompany(id);
  // }

  // @Post('campaign/create')
  // createCampaign(@Body() data: CreateCampaignDto): Observable<string> {
  //   return this.companyService.createCampaign(data);
  // }

  @Get('position/all')
  getAllCampaigns(): Observable<string> {
    return this.employerService.getAllPositions();
  }

  @Get('position/:id')
  findCampaignById(@Param('id') id: number): Observable<string> {
    return this.employerService.findPositionById(id);
  }

  // @Post('campaign/update')
  // updateCampaign(@Body() data: UpdateCampaignDto): Observable<string> {
  //   return this.companyService.updateCampaign(data);
  // }

  // @Get('campaign/:id/employer')
  // findEmployerId(@Param('id') id: number): Observable<string> {
  //   return this.companyService.findEmployerId(id);
  // }
}

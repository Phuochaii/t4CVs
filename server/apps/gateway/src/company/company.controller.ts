import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCompanyDto } from './dto/Req/createCompany.dto';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/Req/updateCompany.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  createCompany(@Body() data: CreateCompanyDto): Observable<string> {
    return this.companyService.createCompany(data);
  }

  @Get('all')
  getAllCompanies(): Observable<string> {
    return this.companyService.getAllCompanies();
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
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '../entity/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @Post()
  create(@Body() company: Company): Promise<Company> {
    return this.companyService.create(company);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() company: Company): Promise<Company> {
    return this.companyService.update(id, company);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.companyService.delete(id);
  }
}

import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/Req/createEmployer.dto';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post('create')
  createEmployer(@Body() data: CreateEmployerDto): Observable<string> {
    return this.employerService.createEmployer(data);
  }

  @Get('all')
  getAllEmployers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<string> {
    return this.employerService.getAllEmployers(page, limit);
  }

  @Get(':id')
  findEmployerById(@Param('id') id: string) {
    return this.employerService.findEmployerById(id);
  }

  @Get('position/all')
  getAllPositions(): Observable<string> {
    return this.employerService.getAllPositions();
  }

  @Get('position/:id')
  findPositionById(@Param('id') id: number): Observable<string> {
    return this.employerService.findPositionById(id);
  }

  @Get('check/:id')
  checkEmployer(@Param('id') id: string): Observable<boolean> {
    return this.employerService.checkEmployer(id);
  }
}

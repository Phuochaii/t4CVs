import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateJobDto } from './dto/Req/createJob.dto';
import { JobService } from './job.service';
import { QueryDTO } from './dto/Req/query.dto';
import { CreateBaseDto } from './dto/Req/createBase.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('all')
  getAllJobs(
    @Query()
    query: QueryDTO,
  ): Observable<string> {
    return this.jobService.getAllJobs(query);
  }

  @Get('valid-jobs')
  getValidJobs(): Observable<string> {
    return this.jobService.getValidJobs();
  }

  @Post('create')
  createJob(@Body() data: CreateJobDto): Observable<string> {
    return this.jobService.createJob(data);
  }

  @Get(':id')
  findJobById(@Param('id') id: number): Observable<string> {
    return this.jobService.findJobById(id);
  }

  @Post('major/create')
  createMajor(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createMajor(data);
  }

  @Get('major/all')
  getAllMajor(): Observable<string> {
    return this.jobService.getAllMajor();
  }
  @Post('field/create')
  createField(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createField(data);
  }

  @Get('field/all')
  getAllField(): Observable<string> {
    return this.jobService.getAllField();
  }
  @Post('currency/create')
  createCurrency(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createCurrency(data);
  }

  @Get('currency/all')
  getAllCurrency(): Observable<string> {
    return this.jobService.getAllCurrency();
  }
  @Post('level/create')
  createLevel(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createLevel(data);
  }

  @Get('level/all')
  getAllLevel(): Observable<string> {
    return this.jobService.getAllLevel();
  }
  @Post('location/create')
  createLocation(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createLocation(data);
  }

  @Get('location/all')
  getAllLocation(): Observable<string> {
    return this.jobService.getAllLocation();
  }
  @Post('exp/create')
  createExp(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createExp(data);
  }

  @Get('exp/all')
  getAllExp(): Observable<string> {
    return this.jobService.getAllExp();
  }
  @Post('type/create')
  createJobType(@Body() data: CreateBaseDto): Observable<string> {
    return this.jobService.createJobType(data);
  }

  @Get('type/all')
  getAllJobType(): Observable<string> {
    return this.jobService.getAllJobType();
  }
}

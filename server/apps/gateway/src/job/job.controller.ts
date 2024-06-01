import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateJobDto } from './dto/Req/createJob.dto';
import { JobService } from './job.service';
import { CreateBaseDto } from './dto/Req/createBase.dto';
import { UpdateJobDto } from './dto/Req/update-job.dto';
import { QueryDTO } from './dto/Req/query.dto';
import { FindJobByCampaignIdDto } from 'apps/job/src/domain/dto/Resp/find-job-by-campaignId.dto';
import { FindJobsWithCampaignIdsDto } from './dto/Req/find-jobs-with-campaign-ids.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('')
  findJobByCampaignId(@Query('campaignId') campaignId: number) {
    return this.jobService.findJobByCampaignId(campaignId);
  }

  @Post('jobs-by-campaignIds')
  findJobsByCampaignIds(@Body() data: FindJobsWithCampaignIdsDto) {
    return this.jobService.findJobsByCampaignIds(data.campaignIds);
  }

  @Get('all')
  getAllJobs(
    @Query()
    queryParams: QueryDTO,
  ): Promise<string> {
    return this.jobService.getAllJobs(queryParams);
  }

  @Get('valid-jobs')
  getValidJobs(
    @Query()
    queryParams: QueryDTO,
  ): Promise<string> {
    return this.jobService.getValidJobs(queryParams);
  }

  @Get('create-info')
  getJobInfo(): Observable<string> {
    return this.jobService.createJobInfo();
  }

  @Post('create')
  createJob(@Body() data: CreateJobDto): Observable<string> {
    return this.jobService.createJob(data);
  }

  @Get(':id')
  findJobById(@Param('id') id: number): Promise<any> {
    return this.jobService.findJobById(id);
  }

  @Put('update-status')
  updateJobStatus(@Body() data: UpdateJobDto) {
    return this.jobService.updateJobStatus(data);
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

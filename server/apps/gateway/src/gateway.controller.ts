import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Observable } from 'rxjs';
import { CreateJobDto } from './job/Type/Req/createJob.dto';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @Get('job/all')
  getAllJobs(): Observable<string> {
    return this.gatewayService.getAllJobs();
  }

  @Post('/job/create')
  createJob(@Body() data: CreateJobDto): Observable<string> {
    return this.gatewayService.createJob(data);
  }

  // @Post('cv/create')
  // createCV(): Observable<string> {
  //   console.log(1);
  //   return this.gatewayService.getHelloFromCVService();
  // }
}

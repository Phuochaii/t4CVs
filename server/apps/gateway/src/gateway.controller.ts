import { Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Observable } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @Post('cv/create')
  createCV(): Observable<string> {
    console.log(1);
    return this.gatewayService.getHelloFromCVService();
  }
}

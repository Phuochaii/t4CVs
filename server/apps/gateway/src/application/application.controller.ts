import { Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('application')
export class ApplicationController {
  constructor(
    @Inject('APPLICATION_SERVICE')
    private readonly applicationService: ClientProxy,
  ) {}

  @Get()
  async getApplication() {
    return this.applicationService.send(
      {
        cmd: 'get-all-application',
      },
      {},
    );
  }

  @Post()
  async createSubscriberTCP(@Req() req: any) {
    return this.applicationService.send(
      {
        cmd: 'add-application',
      },
      req.user,
    );
  }
}

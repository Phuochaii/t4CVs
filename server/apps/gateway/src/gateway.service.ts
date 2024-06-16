import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GatewayService {
  constructor(
    private readonly configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World! ' + this.configService.get('GATEWAY_PORT');
  }
}

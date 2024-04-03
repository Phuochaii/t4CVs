import { Injectable } from '@nestjs/common';

@Injectable()
export class JobApplicationService {
  getHello(): string {
    return 'Hello World!';
  }
}

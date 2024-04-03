import { Injectable } from '@nestjs/common';

@Injectable()
export class JobApplicationServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

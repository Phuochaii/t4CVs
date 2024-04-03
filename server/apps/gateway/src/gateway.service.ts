import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class GatewayService {
  constructor(@Inject('CV') private readonly cvClient: ClientProxy) {}
  getHello(): string {
    return 'Hello World!';
  }

  getHelloFromCVService(): Observable<string> {
    const a = this.cvClient.send({ cmd: 'create_cv' }, {});
    return a.pipe((response) => {
      return response;
    });
  }
}

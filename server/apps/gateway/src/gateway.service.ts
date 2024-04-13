import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  getHello(): string {
    return 'Hello World!';
  }

  // getHelloFromCVService(): Observable<string> {
  //   const a = this.cvClient.send({ cmd: 'create_cv' }, {});
  //   return a.pipe((response) => {
  //     return response;
  //   });
  // }
}

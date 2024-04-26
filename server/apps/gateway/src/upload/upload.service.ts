import { Body, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UploadService {
  constructor(@Inject('UPLOAD') private readonly uploadClient: ClientProxy) {}
  getHello(): Observable<any> {
    return this.uploadClient.send({ cmd: 'hello' }, {});
  }

  uploadCV(file: any, userId: number): Observable<any> {
    return this.uploadClient.send({ cmd: 'upload_cv' }, { file, userId });
  }
}

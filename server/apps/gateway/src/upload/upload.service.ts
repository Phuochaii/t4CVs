import { Body, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UploadCVDto } from './dto/upload.dto';

@Injectable()
export class UploadService {
  constructor(@Inject('UPLOAD') private readonly uploadClient: ClientProxy) {}
  getHello(): Observable<any> {
    return this.uploadClient.send({ cmd: 'hello' }, {});
  }

  uploadCV(file: any, uploadCVDto: UploadCVDto): Observable<any> {
    console.log(JSON.stringify(file) + JSON.stringify(uploadCVDto));
    uploadCVDto.file = file;
    return this.uploadClient.send({ cmd: 'upload_cv' }, uploadCVDto);
  }
}

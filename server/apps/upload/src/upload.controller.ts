import { Controller } from '@nestjs/common';
import * as multer from 'multer';
import { UploadCVDto } from './dto/upload.dto';
import { UploadService } from './upload.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @MessagePattern({ cmd: 'hello' })
  getHello() {
    return 'Hello World';
  }

  @MessagePattern({ cmd: 'upload_cv' })
  uploadCV(data: { file: any; userId: number }) {
    return this.uploadService.uploadCV(data);
  }
}

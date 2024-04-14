import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UploadService } from './upload.service';
import { UploadCVDto } from './dto/upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('hello')
  getHello(): Observable<any> {
    return this.uploadService.getHello();
  }

  @Post('cv')
  uploadCV(@Body() data: UploadCVDto): Observable<any> {
    return this.uploadService.uploadCV(data);
  }
}

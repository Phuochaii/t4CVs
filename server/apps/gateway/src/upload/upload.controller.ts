import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UploadService } from './upload.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('hello')
  getHello(): Observable<any> {
    return this.uploadService.getHello();
  }

  @Post('cv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadCV(@UploadedFile() file: any, @Body() userId: number): Observable<any> {
    return this.uploadService.uploadCV(file, userId);
  }
}

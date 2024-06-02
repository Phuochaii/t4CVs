import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UploadService } from './upload.service';
import { Express } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('hello')
  getHello(): Observable<any> {
    return this.uploadService.getHello();
  }

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  upload(@UploadedFile() file: any): any {
    return this.uploadService.upload(file);
  }

  @Post('uploadfiles')
  @UseInterceptors(
    FilesInterceptor('files', 99, {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadFiles(@UploadedFiles() files: any[]): any {
    console.log(JSON.stringify(files));
    return this.uploadService.uploadFiles(files);
  }
}

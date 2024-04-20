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
import { UploadCVDto } from './dto/upload.dto';
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
        destination: './uploadedFiles',
      }),
    }),
  )
  uploadCV(
    @UploadedFile() file: any,
    @Body() uploadCVDto: UploadCVDto,
  ): Observable<any> {
    console.log(JSON.stringify(file) + JSON.stringify(uploadCVDto));
    return this.uploadService.uploadCV(file, uploadCVDto);
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CVService } from './cv.service';
import { CVDto } from './dto/cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('cv')
export class CVController {
  uploadService: any;
  constructor(private readonly cvService: CVService) {}

  @Get()
  getAllCVs(): Observable<any> {
    return this.cvService.getAllCVs();
  }

  @Get('hello')
  getHello(): Observable<any> {
    return this.cvService.getHello();
  }

  @Get(':id')
  getCVById(@Param('id') id: number): Observable<any> {
    return this.cvService.getCVById(id);
  }

  @Post()
  createCV(@Body() cvDto: CVDto): Observable<any> {
    return this.cvService.createCV(cvDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadCV(@UploadedFile() file: any, @Body() userId: number): Observable<any> {
    return this.cvService.uploadCV(file, userId);
  }

  @Put(':id')
  updateCV(@Param('id') id: number, @Body() cvDto: CVDto): Observable<any> {
    return this.cvService.updateCV(id, cvDto);
  }

  @Delete(':id')
  deleteCV(@Param('id') id: number): Observable<any> {
    return this.cvService.deleteCV(id);
  }

  @Get('download/:id')
  downloadCV(@Param('id') id: number): Observable<any> {
    return this.cvService.downloadCV(id);
  }
}

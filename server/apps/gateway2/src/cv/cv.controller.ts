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
  Res,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CVService } from './cv.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  createCV(
    @UploadedFile() file: any,
    @Body('userId') userId: string,
    @Body('templateId') templateId: string,
  ): Observable<any> {
    const numericUserId = parseInt(userId, 10);
    const numericTemplateId = parseInt(templateId, 10);
    return this.cvService.createCV(file, numericUserId, numericTemplateId);
  }

  @Put(':id')
  updateCV(
    @Param('id') id: number,
    @Body('isPublic') isPublic: boolean,
  ): Observable<any> {
    return this.cvService.updateCV(id, isPublic);
  }

  @Delete(':id')
  deleteCV(@Param('id') id: number): Observable<any> {
    return this.cvService.deleteCV(id);
  }

  @Get('download/:id')
  downloadCV(@Param('id') id: number, @Res() res: Response): Observable<any> {
    return this.cvService.downloadCV(id, res);
  }

  // @Get('/test')
  // getCVsById(): Observable<any[]> {
  //   return this.cvService.getCVsById();
  // }
}

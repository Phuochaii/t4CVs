import { Module, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { CVDto } from './dto/cv.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UploadService {
  constructor(private readonly httpService: HttpService) {}
  async uploadCV(data): Promise<any> {
    const { file, userId } = data;
    const fileExtension = path.extname(file.originalname);
    const newFilename = `${uuidv4()}${fileExtension}`;
    const uploadPath = './uploads';

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    try {
      await fs.promises.rename(file.path, `${uploadPath}/${newFilename}`);
      const cvDto = new CVDto();
      cvDto.userId = Number(userId.userId);
      cvDto.templateId = 1;
      cvDto.link = `localhost:3000/cv/${newFilename}`;
      cvDto.creationAt = new Date();
      cvDto.isPublic = true;
      cvDto.lastModified = new Date();

      console.log(JSON.stringify(cvDto));

      const result = this.httpService.post(
        'http://localhost:3000/cv',
        JSON.stringify(cvDto),
      );

      return result;
    } catch (error: any) {
      console.error('Error uploading file:', error);
      throw new Error(error);
    }
  }
}

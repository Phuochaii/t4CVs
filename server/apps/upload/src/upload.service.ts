import { Injectable } from '@nestjs/common';
import { UploadCVDto } from './dto/upload.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  async uploadCV(uploadCVDto: UploadCVDto): Promise<any> {
    console.log(JSON.stringify(uploadCVDto.file) + JSON.stringify(uploadCVDto));

    const fileExtension = path.extname(uploadCVDto.file.originalname);
    const newFilename = `${uuidv4()}${fileExtension}`;
    const uploadPath = './uploads';

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    try {
      await fs.promises.rename(
        uploadCVDto.file.path,
        `${uploadPath}/${newFilename}`,
      );
      return newFilename;
    } catch (error: any) {
      console.error('Error uploading file:', error);
      throw new Error(error);
    }
  }
}

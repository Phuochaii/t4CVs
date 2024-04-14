import { Injectable } from '@nestjs/common';
import { UploadCVDto } from './dto/upload.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  async uploadCV(uploadCVDto: UploadCVDto): Promise<any> {
    const {
      file,
      filename,
      mimetype,
      fileSize,
      userId,
      cvId,
      uploadDate,
      updateDate,
    } = uploadCVDto;

    // File size validation (5MB limit)
    if (fileSize > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Validate supported file types (PDF, DOC, DOCX)
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedMimeTypes.includes(mimetype)) {
      throw new Error(
        'Invalid file type. Only PDF, DOC, and DOCX files are allowed',
      );
    }

    const newFilename = `${uuidv4()}.${filename.split('.').pop()}`;

    const uploadPath = './uploads';

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    try {
      const decodedFile = Buffer.from(file, 'base64');
      fs.writeFileSync(`${uploadPath}/${newFilename}`, decodedFile);
      return newFilename;
    } catch (error: any) {
      console.error('Error uploading file:', error);
      return 'Error';
      throw new Error(error);
    }
  }
}

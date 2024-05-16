import { Body, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname, basename } from 'path';
import { readFile } from 'fs/promises';

@Injectable()
export class UploadService {
  private s3Client: S3Client;

  constructor(
    @Inject('UPLOAD') private readonly uploadClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {
    // this.s3Client = new S3Client({
    //   region: this.configService.get<string>('AWS_S3_REGION'),
    //   credentials: {
    //     accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
    //     secretAccessKey: this.configService.get<string>(
    //       'AWS_SECRET_ACCESS_KEY',
    //     ),
    //   },
    // });
    this.s3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'AKIAQKSEVUV3HYYNEI7P',
        secretAccessKey: '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',
      },
    });
  }
  getHello(): any {
    return 'Hello';
  }

  async uploadCV(file: any): Promise<string> {
    try {
      const bucketName = this.configService.get<string>('BUCKET_NAME');
      console.log(bucketName);
      const fileExtension = extname(file.originalname);
      const filename = basename(file.originalname, fileExtension);
      const timestamp = Date.now().toString();
      const newFilename = `${filename}-${timestamp}${fileExtension}`;

      // Đọc nội dung của file từ đường dẫn
      const fileContent = await readFile(file.path);

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fileContent,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      console.log('Await');

      return `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  }
}

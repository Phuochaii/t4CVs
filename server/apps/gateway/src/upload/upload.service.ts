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
import { Readable } from 'stream';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

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

  async upload(file: any): Promise<string> {
    try {
      const bucketName = this.configService.get<string>('BUCKET_NAME');
      console.log(bucketName);
      const fileExtension = extname(file.originalname);
      const filename = basename(file.originalname, fileExtension);
      const timestamp = Date.now().toString();
      const newFilename = `${filename}-${timestamp}${fileExtension}`;

      const fileContent = await readFile(file.path);

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fileContent,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      return `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  }

  async uploadFiles(files: any[]): Promise<string[]> {
    const uploadPromises = files.map((file) => this.upload(file));
    return await Promise.all(uploadPromises);
  }

  async download(s3Link: string, res: Response): Promise<void> {
    try {
      const linkParts = s3Link.split('/');
      const bucketName = linkParts[2];
      const filename = linkParts[linkParts.length - 1];

      const getObjectCommand = new GetObjectCommand({
        Bucket: 'nestjsdacnpm',
        Key: filename,
      });
      const { Body } = await this.s3Client.send(getObjectCommand);

      const readableStream = Readable.from(Body as any);

      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', 'application/pdf');

      readableStream.pipe(res);
    } catch (error: any) {
      console.error(error);
      throw new HttpException('CV not found', HttpStatus.NOT_FOUND);
    }
  }
}

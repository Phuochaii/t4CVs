import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { CV } from './entities/cv.entity';
import { CVDto } from './dto/cv.dto';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

// env
const AWS_ACCESS_KEY = 'AKIAQKSEVUV3HYYNEI7P';
const AWS_SECRET_ACCESS_KEY = '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';
const AWS_S3_REGION = 'us-east-1';
const BUCKET_NAME = 'nestjsdacnpm';

@Injectable()
export class CVService {
  private readonly db: sqlite3.Database;

  private s3Client: S3Client;

  constructor(private readonly config_service: ConfigService) {
    this.s3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'AKIAQKSEVUV3HYYNEI7P',
        secretAccessKey: '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',
      },
    });

    this.db = new sqlite3.Database('./apps/cv/table.sql');
    this.initializeDatabase();
  }

  private initializeDatabase() {
    const CREATE_CV_TABLE_SQL = `
      CREATE TABLE IF NOT EXISTS CV (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        templateId INTEGER,
        link TEXT,
        isPublic BOOLEAN DEFAULT 1,
        creationAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        lastModified DATETIME
      )
    `;

    this.db.run(CREATE_CV_TABLE_SQL, (err) => {
      if (err) {
        console.error('Error initializing database:', err.message);
      } else {
        console.log('Database schema initialized successfully.');
      }
    });
  }

  async create(cvData: Partial<CV>): Promise<CV> {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare(
        'INSERT INTO CV (userId, templateId, link, isPublic) VALUES (?, ?, ?, ?)',
      );
      stmt.run(
        cvData.userId,
        cvData.templateId,
        cvData.link,
        cvData.isPublic ? 1 : 0,
        function (err: any) {
          if (err) {
            reject(err);
          } else {
            // Get the ID of the inserted row using this.lastID
            const newId = this.lastID;
            resolve(
              new CV({
                id: newId,
                userId: cvData.userId,
                templateId: cvData.templateId,
                link: cvData.link,
                isPublic: cvData.isPublic,
                creationAt: new Date(),
                lastModified: null,
              }),
            );
          }
        },
      );
      stmt.finalize();
    });
  }

  async update(data: any): Promise<CV> {
    const { id, cvDto } = data;
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare(
        'UPDATE CV SET userId = ?, templateId = ?, link = ?, isPublic = ? WHERE id = ?',
      );
      stmt.run(
        cvDto.userId,
        cvDto.templateId,
        cvDto.link,
        cvDto.isPublic ? 1 : 0,
        id,
        function (err: any) {
          if (err) {
            reject(err);
          } else {
            resolve(
              new CV({
                id,
                userId: cvDto.userId,
                templateId: cvDto.templateId,
                link: cvDto.link,
                isPublic: cvDto.isPublic,
                creationAt: new Date(),
                lastModified: new Date(),
              }),
            );
          }
        },
      );
      stmt.finalize();
    });
  }

  async uploadCV(data: any): Promise<any> {
    const { file, userId } = data;
    const fileExtension = path.extname(file.originalname);
    const newFilename = `${uuidv4()}${fileExtension}`;
    const uploadPath = './uploads';

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    console.log(JSON.stringify(file));

    const fileBuffer = await fs.promises.readFile(file.path);

    try {
      await fs.promises.rename(file.path, `${uploadPath}/${newFilename}`);
      const cvDto = new CVDto();
      cvDto.userId = String(userId.userId);
      cvDto.templateId = 1;
      cvDto.link = `http://${BUCKET_NAME}.s3-website-${AWS_S3_REGION}.amazonaws.com/${newFilename}`;
      cvDto.creationAt = new Date();
      cvDto.isPublic = true;
      cvDto.lastModified = new Date();

      console.log(JSON.stringify(file));

      const putObjectCommand = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: newFilename,
        Body: fileBuffer,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
      });

      await this.s3Client.send(putObjectCommand);

      const result = await this.create(cvDto);

      return result;
    } catch (error: any) {
      console.error('Error uploading file:', error);
      throw new Error(error);
    }
  }

  async findAll(): Promise<CV[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM CV', (err, rows: any) => {
        if (err) {
          reject(err);
        } else {
          const cvs: CV[] = rows.map((row: any) => {
            // Ensure 'id' property exists in the row object
            if (!row.id) {
              console.error('WARNING: Row missing "id" property:', row);
              // Handle missing ID as needed (e.g., throw an error or assign a default)
            }
            return new CV({ id: row.id, ...row });
          });
          resolve(cvs);
        }
      });
    });
  }

  async findOne(id: number): Promise<CV> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM CV WHERE id = ?', [id], (err, row: any) => {
        if (err) {
          reject(err);
        } else if (!row) {
          reject(new Error('CV not found'));
        } else {
          resolve(new CV(row));
        }
      });
    });
  }

  async remove(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM CV WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async downloadCV(id: number): Promise<any> {
    try {
      const cv = await this.findOne(id);

      const linkParts = cv.link.split('/');
      const bucketName = linkParts[2];
      const filename = linkParts[linkParts.length - 1];

      const getObjectCommand = new GetObjectCommand({
        Bucket: 'nestjsdacnpm',
        Key: filename,
      });
      const { Body } = await this.s3Client.send(getObjectCommand);

      const readableStream = Readable.from(Body as any);

      const filePath = `D:\\${filename}`;
      const fileStream = fs.createWriteStream(filePath);

      readableStream.pipe(fileStream);

      await new Promise((resolve, reject) => {
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
      });

      return filePath;
    } catch (error: any) {
      console.error(error);
      throw new HttpException('CV not found', HttpStatus.NOT_FOUND);
    }
  }
}

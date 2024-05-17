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

  async create(cvData: any): Promise<CV> {
    console.log(cvData);
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
                isPublic: true,
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
}

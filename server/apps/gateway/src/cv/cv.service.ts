import { Inject, Injectable } from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
// import { CVDto } from './dto/cv.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UploadService } from '../upload/upload.service';
import { Response } from 'express';

@Injectable()
export class CVService {
  constructor(
    @Inject('CV') private readonly cvClient: ClientProxy,
    private readonly uploadService: UploadService,
  ) {}

  getHello(): Observable<any> {
    return this.cvClient.send({ cmd: 'hello' }, {});
  }

  getAllCVs(): Observable<any> {
    return this.cvClient.send({ cmd: 'getAllCVs' }, {});
  }

  getCVById(id: number): Observable<any> {
    return this.cvClient.send({ cmd: 'getCVById' }, id);
  }
  getCVsById(Ids: number[]): Observable<any[]> {
    // const Ids: number[] = [1, 2];
    return this.cvClient.send({ cmd: 'getCVsById' }, Ids);
  }

  createCV(file: any, userId: number, templateId: number): Observable<any> {
    const uploadLink$ = from(this.uploadService.upload(file));
    return uploadLink$.pipe(
      switchMap((link: string) =>
        this.cvClient.send({ cmd: 'createCV' }, { userId, link, templateId }),
      ),
    );
  }

  updateCV(id: number, isPublic: boolean): Observable<any> {
    return this.cvClient.send({ cmd: 'updateCV' }, { id, isPublic });
  }

  deleteCV(id: number): Observable<any> {
    return this.cvClient.send({ cmd: 'deleteCV' }, id);
  }

  downloadCV(id: number, res: Response): Observable<any> {
    return this.cvClient.send({ cmd: 'getCVById' }, id).pipe(
      switchMap((cv: any) => {
        if (!cv || !cv.link) {
          throw new Error('CV not found or link not available');
        }
        return this.uploadService.download(cv.link, res);
      }),
    );
  }
}

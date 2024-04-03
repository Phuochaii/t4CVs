import { Injectable } from '@nestjs/common';
import { CvService } from './entities/cv-service.entity';

@Injectable()
export class CvServiceService {
  private readonly CVs: CvService[] = [];

  // create(createCvServiceInput: CreateCvServiceInput) {
  //   return 'This action adds a new cvService';
  // }

  findAll() {
    return `This action returns all cvService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cvService`;
  }

  async createCV(userId: number, cvData: string): Promise<CvService> {
    const cv: CvService = {
      id: this.CVs.length + 1,
      userId,
      cvData,
      createDate: new Date(),
      lastModifiedDate: new Date(),
    };
    this.CVs.push(cv);
    return cv;
  }

  async getCVById(id: number): Promise<CvService> {
    return this.CVs.find((cv) => cv.id === id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCvServiceInput } from './dto/create-cv-service.input';

@Injectable()
export class CvServiceService {
  create(createCvServiceInput: CreateCvServiceInput) {
    return 'This action adds a new cvService';
  }

  findAll() {
    return `This action returns all cvService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cvService`;
  }
}

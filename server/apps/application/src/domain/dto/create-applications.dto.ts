import { Application } from '../entity';
import { ClassProperties } from '@app/common/type';

export class CreateApplicationDto
  implements
    Omit<
    ClassProperties<Application>,
      'id' | 'createdAt' | 'updateAt' | 'status'
    >
{
  fullname: string;
  phone: string;
  email: string;
  coverLetter: string;
  campaignId: number;
  userId: string;
  cvId: number;
}

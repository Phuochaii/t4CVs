import { Application } from '../entity';

export class CreateApplicationDto
  implements Omit<Application, 'id' | 'createdAt' | 'updateAt' | 'status'>
{
  fullname: string;
  phone: string;
  email: string;
  coverLetter: string;
  campaignId: number;
  userId: string;
  cvId: number;
}

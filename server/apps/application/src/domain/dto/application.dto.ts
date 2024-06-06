import { Application } from "../entity";

export class ApplicationDto implements Application {
  id: number;
  status: boolean;
  fullname: string;
  phone: string;
  email: string;
  coverLetter: string;
  createdAt: string;
  updateAt: string;
  campaignId: number;
  userId: string;
  cvId: number;
}

import { ApplicationFromServer } from "./Application.type";
import { CompanyFromServer } from "./Company.type";
import { EmployerFromServer } from "./Employer.type";
import { RecruitmentFromServer } from "./Recruitment.type";
import { UserFromServer } from "./User.type";

export interface Campaign {
  campaignName: string;
  campaignId: number;
  company: CompanyFromServer | null;
  postDate: Date;
  employer: EmployerFromServer;
  recruitment: RecruitmentFromServer;
  applications: ApplicationFromServer[];
  applicants: UserFromServer[];
}

export interface CampaignFromServer {
  id: number;
  employerId: number;
  name: string;
  createdAt: string;
}

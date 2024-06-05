export interface CV {
  id: number;
  link: string;
}

export interface Company {
  id: number;
  field: number;
  taxCode: string;
  name: string;
  website: string;
  image: string;
  address: string;
  phone: string;
  companySize: number;
  description: string;
  status: boolean;
}

export interface Job {
  titleRecruitment: string;
  salaryMax: number;
  salaryMin: number;
  campaignId: number;
  status: boolean;
  company: Company;
}
export interface ApplicationFromServer {
  id: number;
  status: true;
  fullname: string;
  phone: string;
  email: string;
  coverLetter: string;
  createdAt: string;
  updateAt: string;
  campaignId: number;
  userId: number;
  cvId: number;
  cv: CV;
  jobs: Job;
}

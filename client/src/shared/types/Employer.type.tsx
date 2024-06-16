import { CompanyFromServer } from './Company.type';

export interface EmployerFromServer {
  id: string;
  fullname: string;
  gender: string;
  skype: string;
  companyId: number;
  license: string;
  phoneNumber: string;
  licenseStatus: boolean;
  phoneNumberStatus: boolean;
  image: string;
  company?: CompanyFromServer | null;
  supplement?: string;
}

import { EmployerFromServer } from './Employer.type';

export interface CompanyFromServer {
  id: number;
  field: number;
  fieldName: string;
  taxCode: string;
  name: string;
  website: string;
  image: string;
  address: string;
  phone: string;
  companySize: number;
  description: string;
  status: boolean;
  employers?: EmployerFromServer[];
}

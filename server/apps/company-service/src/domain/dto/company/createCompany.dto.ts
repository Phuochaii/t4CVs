import { Company } from '../../entity';

export class CreateCompanyDTO implements Omit<Company, 'id' | 'status'> {
  field: number;
  taxCode: string;
  name: string;
  website: string;
  image: string;
  address: string;
  phone: string;
  companySize: number;
  description: string;
}

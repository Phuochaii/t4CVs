import { Employer } from '../../entity';

export class CreateEmployerDTO
  implements
    Omit<
      Employer,
      | 'companyId'
      | 'license'
      | 'licenseStatus'
      | 'phoneNumberStatus'
      | 'supplement'
    >
{
  id: string;
  fullname: string;
  gender: string;
  positionId: number;
  skype: string;
  phoneNumber: string;
  image: string;
}

import { Campaign } from '../../entity';

export class CreateCampaignDTO implements Omit<Campaign, 'id' | 'createdAt'> {
  name: string;
  employerId: string;
}

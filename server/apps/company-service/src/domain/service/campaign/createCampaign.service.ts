import { Campaign } from '../../entity';
import { BaseService } from '../base.service';

export class CreateCampaignService implements BaseService<Campaign> {
  execute(...args: any[]): Promise<Campaign> {
    console.log(args);
    throw new Error('Method not implemented.');
  }
}

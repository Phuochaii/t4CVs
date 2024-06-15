import { Application } from '../entity';

export abstract class ApplicationWriteRepository {
  abstract save(application: Application): Promise<void>;

  abstract getNextId(): Promise<Application['id']>;

  abstract getById(id: Application['id']): Promise<Application | null>;

  abstract getByCampaignId(
    campaignId: Application['campaignId'],
  ): Promise<Application[]>;

  abstract deleteById(
    id: Application['id'],
  ): Promise<void>;
}

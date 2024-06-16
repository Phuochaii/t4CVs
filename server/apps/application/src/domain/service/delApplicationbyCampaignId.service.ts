import { Application } from '../entity';
import { DeleteByCampaignIdDto } from '../dto';
import { BaseService } from '@app/common/domain';
import { ApplicationWriteRepository } from '../repository';

export class DelApplicationService implements BaseService<string> {
  constructor(private readonly writeRepostory: ApplicationWriteRepository) {}
  async execute(request: DeleteByCampaignIdDto) {
    const toBeDeletedApplications = await this.writeRepostory.getByCampaignId(
      request.campaignId,
    );
    await Promise.all(
      toBeDeletedApplications.map(
        async (application) =>
          await this.writeRepostory.deleteById(application.id),
      ),
    );
    return 'sucess';
  }
}

import { BaseService } from '@app/common/domain';
import { Application } from '../entity';
import { ApplicationWriteRepository } from '../repository';
import { UpdateApplicationDto } from '../dto';

export class UpdateApplicationService implements BaseService<Application> {
  constructor(private readonly writeRepository: ApplicationWriteRepository) {}

  async execute(
    request: UpdateApplicationDto,
  ): Promise<Application | null> {
    const applicaion = await this.writeRepository.getById(request.id);
    if (!applicaion) {
      return null;
    }
    applicaion.updateStatus(request.status);
    await this.writeRepository.save(applicaion);
    return applicaion;
  }
}

import { IEvent } from '@app/common/domain';
import { UpdateApplicationDto } from '../dto';
import { Application } from '../entity';

export class ApplicationUpdatedEvent implements IEvent {
  constructor(
    public readonly data: UpdateApplicationDto & {
      updateAt: Application['updateAt'];
    },
  ) {}
}

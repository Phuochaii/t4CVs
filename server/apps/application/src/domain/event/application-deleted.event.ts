import { IEvent } from '@app/common/domain';
import { Application } from '../entity';

export class ApplicationDeletedEvent implements IEvent {
  constructor(
    public readonly data: {
      id: Application['id'];
    },
  ) {}
}

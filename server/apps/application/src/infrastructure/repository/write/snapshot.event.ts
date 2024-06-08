import { IEvent } from '@app/common/domain';
import { Application } from '../../../domain/entity';
import { ClassProperties } from '@app/common/type';

export type AppState = {
  applications: ClassProperties<Application>[];
};
export class SnapShotEvent implements IEvent {
  constructor(
    public readonly data: {
      state: AppState;
      revision: number;
    },
  ) {}
}

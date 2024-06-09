import { IEvent } from '@app/common/domain';
import { Application } from '../../../domain/entity';
import { ClassProperties } from '@app/common/type';
import { BaseEntity } from 'typeorm';

export type AppState = {
  applications: Application[];
};
export type AppStateData = {
  applications: Omit<ClassProperties<Application>, keyof BaseEntity>[];
};
export class SnapShotEvent implements IEvent {
  constructor(
    public readonly data: {
      state: AppStateData;
      revision: number;
    },
  ) {}
}

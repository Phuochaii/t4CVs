export * from './application-created.projection';
export * from './start-app.projection';
import { ApplicationCreatedProjection } from './application-created.projection';
import { ApplicationUpdatedProjection } from './application-updated.projection';
import { StartAppProjection } from './start-app.projection';
export const Projections = [
  ApplicationCreatedProjection,
  ApplicationUpdatedProjection,
  StartAppProjection,
];

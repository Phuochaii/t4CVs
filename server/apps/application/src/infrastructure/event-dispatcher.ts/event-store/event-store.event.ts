import {
  ApplicationCreatedEvent,
  ApplicationDeletedEvent,
  ApplicationUpdatedEvent,
} from 'apps/application/src/domain/event';

export const Events = [
  ApplicationCreatedEvent,
  ApplicationUpdatedEvent,
  ApplicationDeletedEvent,
];

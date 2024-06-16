import { IEventPublisher } from '@nestjs/cqrs';

export interface IOrchestratableEventPublisher extends IEventPublisher {
  canHandle(event: any): boolean;
}

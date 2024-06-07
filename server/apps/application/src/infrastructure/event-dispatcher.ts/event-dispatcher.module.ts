import { IEventDispatcher } from '@app/common/domain';
import { Module } from '@nestjs/common';
import { EventDispatcher } from './event-dispatcher.implement';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    {
      provide: IEventDispatcher,
      useClass: EventDispatcher,
    },
  ],
  exports: [IEventDispatcher],
})
export class EventDispatcherModule {}


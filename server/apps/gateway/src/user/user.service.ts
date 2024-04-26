import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER') private readonly userClient: ClientProxy) {}
  findJobById(id: number): Observable<string> {
    return this.userClient.send({ cmd: 'find_user_by_id' }, id);
  }
}

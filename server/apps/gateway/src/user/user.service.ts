import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateUserDTO } from './dto/Req/createUser.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER') private readonly userClient: ClientProxy) {}

  // async createUser(
  //   user: CreateUserDTO,
  //   image: Express.Multer.File,
  // ): Observable<string> {
  //   const linkImage = 'https://s3.com/demo.jpg'; // call file service
  //   const lastLinkImage: string = await lastValueFrom(linkImage);
  //   user.image = lastLinkImage;
  //   return this.userClient.send({ cmd: 'create_user' }, user);
  // }

  findJobById(id: number): Observable<string> {
    return this.userClient.send({ cmd: 'find_user_by_id' }, id);
  }
}

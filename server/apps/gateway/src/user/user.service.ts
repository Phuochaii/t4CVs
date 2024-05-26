import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateUserDTO } from './dto/Req/createUser.dto';

@Injectable()
export class UserService {
  //   user.image = lastLinkImage;

  constructor(@Inject('USER') private readonly userClient: ClientProxy) {}

  findAllUsers(): Observable<string> {
    return this.userClient.send({ cmd: 'find_all_users' }, {});
  }

  isUserExist(id: string): Observable<boolean> {
    return this.userClient.send({ cmd: 'is_user_exist' }, id);
  }

  async createUser(
    user: CreateUserDTO,
    // image: Express.Multer.File,
  ) {
    //  const linkImage = 'https://s3.com/demo.jpg'; // call file service
    //   const lastLinkImage: string = await lastValueFrom(linkImage);
    //   user.image = lastLinkImage;
    const _user = this.userClient.send({ cmd: 'create_user' }, user);
    const lastUser = await lastValueFrom(_user);
    if (lastUser === null) {
      return new BadRequestException(`User exits!`);
    }
    return lastUser;
  }

  async findUserById(id: string) {
    const user = this.userClient.send({ cmd: 'find_user_by_id' }, id);
    const lastUser = await lastValueFrom(user);
    if (lastUser === null) {
      throw new BadRequestException(`User doesn't exit!`);
    }
    return lastUser;
  }
}

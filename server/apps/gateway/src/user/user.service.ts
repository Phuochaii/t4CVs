import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  Observable,
  catchError,
  from,
  lastValueFrom,
  switchMap,
  throwError,
} from 'rxjs';
import { CreateUserDTO } from './dto/Req/createUser.dto';
import { UploadService } from '../upload/upload.service';
import { UpdateUserDTO } from './dto/Req/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER') private readonly userClient: ClientProxy,
    private readonly uploadService: UploadService,
  ) {}

  updateUser(user: UpdateUserDTO, image: any): Observable<string> {
    if (image) {
      const uploadLink$ = from(this.uploadService.upload(image));
      return uploadLink$.pipe(
        switchMap((img: string) => {
          user.image = img;
          return this.userClient.send({ cmd: 'update_user' }, user).pipe(
            catchError((error) => {
              return throwError(() => error.response);
            }),
          );
        }),
      );
    } else {
      return this.userClient.send({ cmd: 'update_user' }, user).pipe(
        catchError((error) => {
          return throwError(() => error.response);
        }),
      );
    }
  }
  findAllUsers(): Observable<string> {
    return this.userClient.send({ cmd: 'find_all_users' }, {});
  }

  isUserExist(id: string): Observable<boolean> {
    return this.userClient.send({ cmd: 'is_user_exist' }, id);
  }

  async createUser(user: CreateUserDTO, image: any) {
    if (image) {
      const uploadLink$ = from(this.uploadService.upload(image));

      return uploadLink$.pipe(
        switchMap((img: string) => {
          user.image = img;
          return this.userClient.send({ cmd: 'create_user' }, user);
        }),
      );
    } else {
      return this.userClient.send({ cmd: 'create_user' }, user);
    }
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

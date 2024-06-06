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
import { AuthenticationService } from '../authentication/authentication.service';
import { Role } from '../authentication/dto/role.dto';
import { CreateUserAccountDto } from './dto/Req/create-user-account.dto';
import { QueryDTO } from './dto/Req/query.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER') private readonly userClient: ClientProxy,
    private readonly uploadService: UploadService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  updateUser(user: UpdateUserDTO, image: any): Observable<string> {
    if (image) {
      const uploadLink$ = from(this.uploadService.upload(image));
      return uploadLink$.pipe(
        switchMap((img: string) => {
          user.image = img;
          console.log(user);
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

  findAllUsers(query: QueryDTO): Observable<string> {
    return this.userClient.send({ cmd: 'find_all_users' }, query);
  }

  async createUser(user: CreateUserDTO, image: any) {
    await this.authenticationService.asignRole({
      userId: user.id,
      role: Role.USER,
    });
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

  isUserExist(id: string): Observable<boolean> {
    return this.userClient.send({ cmd: 'is_user_exist' }, id);
  }

  async findUserById(id: string) {
    const user = this.userClient.send({ cmd: 'find_user_by_id' }, id);
    const lastUser = await lastValueFrom(user);
    if (lastUser === null) {
      throw new BadRequestException(`User doesn't exit!`);
    }
    return lastUser;
  }

  checkUser(id: string): Observable<boolean> {
    return this.userClient.send({ cmd: 'check_user' }, id);
  }

  async createAccount(user: CreateUserAccountDto): Promise<Observable<string>> {
    const auth0Account = await this.authenticationService.createAccount({
      email: user.email,
      password: user.password,
    });
    await this.authenticationService.asignRole({
      userId: auth0Account.data.user_id,
      role: Role.USER,
    });
    const createUserDto: CreateUserDTO = {
      id: auth0Account.data.user_id,
      fullname: user.fullname,
      phone: auth0Account.data.phone_number,
      image: auth0Account.data.picture,
    };
    return this.userClient.send({ cmd: 'create_user' }, createUserDto);
  }
}

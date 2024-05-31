import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateUserDTO } from './dto/Req/createUser.dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { Role } from '../authentication/dto/role.dto';
import { CreateUserAccountDto } from './dto/Req/create-user-account.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER') private readonly userClient: ClientProxy,
    private readonly authenticationService: AuthenticationService,
  ) {}

  findAllUsers(): Observable<string> {
    return this.userClient.send({ cmd: 'find_all_users' }, {});
  }

  async createUser(
    user: CreateUserDTO,
    // image: Express.Multer.File,
  ): Promise<Observable<string>> {
    //  const linkImage = 'https://s3.com/demo.jpg'; // call file service
    //   const lastLinkImage: string = await lastValueFrom(linkImage);
    //   user.image = lastLinkImage;
    await this.authenticationService.asignRole({
      userId: user.id,
      role: Role.USER,
    });
    return this.userClient.send({ cmd: 'create_user' }, user);
  }

  findUserById(id: string): Observable<string> {
    return this.userClient.send({ cmd: 'find_user_by_id' }, id);
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

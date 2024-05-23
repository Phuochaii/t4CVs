import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateUserDTO } from './dto/Req/createUser.dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { Role } from '../authentication/dto/role.dto';
import { CreateUserDto as CreateUserAccountDto } from '../authentication/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER') private readonly userClient: ClientProxy,
    private readonly authenticationService: AuthenticationService,
  ) { }

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

  findUserById(id: number): Observable<string> {
    return this.userClient.send({ cmd: 'find_user_by_id' }, id);
  }

  checkUser(id: number): Observable<boolean> {
    return this.userClient.send({ cmd: 'check_user' }, id);
  }

  async registerAccount(user: CreateUserAccountDto): Promise<Observable<string>> {
    const auth0Account = await this.authenticationService.createUserAccount({
      email: user.email,
      password: user.password,
      fullname: user.fullname,
    });
    const createUserDto: CreateUserDTO = {
      id: auth0Account.data.user_id,
      fullname: user.fullname,
      phone: auth0Account.data.phone_number,
      image: auth0Account.data.picture,
    }
    return this.userClient.send({ cmd: 'create_user' }, createUserDto);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDTO } from './dto/Req/createUser.dto';
import { CreateUserDto as CreateUserAccountDto } from '../authentication/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, PermissionsGuard, UserClaims } from '../authorization';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAllUsers(): Observable<string> {
    return this.userService.findAllUsers();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Get('check')
  checkUser(@GetUser() user: UserClaims): Observable<boolean> {
    return this.userService.checkUser(user.sub);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Get('/profile')
  getUserProfile(@GetUser() user: UserClaims): Observable<string> {
    return this.userService.findUserById(user.sub);
  }

  @Get(':id')
  findUserById(@Param('id') id: string): Observable<string> {
    return this.userService.findUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createUser(
    @GetUser() userClaims: UserClaims,
    @Body() user: Omit<CreateUserDTO, 'id'>,
  ): Promise<Observable<string>> {
    console.log('create user', userClaims.sub);
    return this.userService.createUser({
      id: userClaims.sub,
      ...user,
    });
  }

  @Post('account')
  registerAccount(
    @Body() user: CreateUserAccountDto,
  ): Promise<Observable<string>> {
    return this.userService.createAccount(user);
  }
}

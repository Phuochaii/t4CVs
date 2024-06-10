import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { CreateUserDTO } from './dto/Req/createUser.dto';
import { CreateUserAccountDto } from './dto/Req/create-user-account.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, PermissionsGuard, UserClaims } from '../authorization';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { QueryDTO } from './dto/Req/query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Get('all')
  findAllUsers(
    @Query()
    queryParams: QueryDTO,
  ): Observable<string> {
    return this.userService.findAllUsers(queryParams);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Get('check')
  checkUser(@GetUser() user: UserClaims): Observable<boolean> {
    return this.userService.checkUser(user.sub);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Get('/profile')
  getUserProfile(@GetUser() user: UserClaims) {
    return this.userService.findUserById(user.sub);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Get('check/:id')
  isUserExist(@Param('id') id: string) {
    return this.userService.isUserExist(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  createUser(
    @UploadedFile() image: any,
    @GetUser() userClaims: UserClaims,
    @Body() user: Omit<CreateUserDTO, 'id'>,
  ) {
    return this.userService.createUser(
      {
        id: userClaims.sub,
        ...user,
      },
      image,
    );
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:user'))
  @Put('update')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  updateUser(
    @GetUser() userClaims: UserClaims,
    @Body() user: Omit<CreateUserDTO, 'id'>,
    @UploadedFile() image: any,
  ) {
    return this.userService.updateUser(
      {
        id: userClaims.sub,
        ...user,
      },
      image,
    );
  }
}

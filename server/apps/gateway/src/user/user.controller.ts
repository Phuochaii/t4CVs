import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { CreateUserDTO } from './dto/Req/createUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateUserDTO } from './dto/Req/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAllUsers(): Observable<string> {
    return this.userService.findAllUsers();
  }

  @Get('check/:id')
  isUserExist(@Param('id') id: string) {
    return this.userService.isUserExist(id);
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  createUser(@UploadedFile() image: any, @Body() user: CreateUserDTO) {
    return this.userService.createUser(user, image);
  }

  @Put('update')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  updateUser(@Body() user: UpdateUserDTO, @UploadedFile() image: any) {
    return this.userService.updateUser(user, image);
  }
}

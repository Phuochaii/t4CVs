import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/Req/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'find_user_by_id' })
  findById(id: number) {
    return this.userService.findById(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  create(user: CreateUserDTO) {
    return this.userService.createUser(user);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  findAll() {
    return this.userService.findAll();
  }
}

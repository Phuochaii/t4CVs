import { Controller } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './domain/dto/Req/create-user.dto';

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

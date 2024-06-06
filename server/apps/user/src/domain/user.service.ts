import { CreateUserDTO } from './dto/Req';
import { UserRepository } from './repository';
import { UpdateUserDTO } from './dto/Req/update-user.dto';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async isUserExist(id: string) {
    return await this.userRepository.isUserExist(id);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async createUser(createUserDTO: CreateUserDTO) {
    return await this.userRepository.createUser(createUserDTO);
  }

  async updateUser(updateUserDTO: UpdateUserDTO) {
    return await this.userRepository.updateUser(updateUserDTO);
  }

  async check(id: string) {
    const user = await this.userRepository.findById(id);
    return !!user;
  }
}

import { CreateUserDTO, QueryDTO } from './dto/Req';
import { FindUserRespDTO } from './dto/Resp/find-users.dto';
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

  async findAll(query: QueryDTO) {
    const { page = 1, limit = 10, ...newQuery } = query;
    const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));
    const users = await this.userRepository.searchUser(newQuery);
    const result: FindUserRespDTO = {
      page: parseInt(String(page)),
      limit: parseInt(String(limit)),
      total: users.length,
      total_pages: Math.ceil(users.length / limit),
      data: users.slice(skip, skip + parseInt(String(limit))),
    };
    return result;
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

import { CreateUserDTO, QueryDTO } from '../dto/Req';
import { UpdateUserDTO } from '../dto/Req/update-user.dto';
import { User } from '../entities';

export abstract class UserRepository {
  abstract updateUser(updateUserDTO: UpdateUserDTO): Promise<User>;
  abstract searchUser(query: QueryDTO): Promise<User[]>;
  abstract isUserExist(id: string): Promise<boolean>;
  abstract findById(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract createUser(user: CreateUserDTO): Promise<User>;
}

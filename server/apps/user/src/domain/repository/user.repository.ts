import { CreateUserDTO, QueryDTO } from '../dto/Req';
import { User } from '../entities';

export abstract class UserRepository {
  abstract searchUser(query: QueryDTO): Promise<User[]>;
  abstract isUserExist(id: string): Promise<boolean>;
  abstract findById(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract createUser(user: CreateUserDTO): Promise<void>;
}

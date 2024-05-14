import { CreateUserDTO } from '../dto/Req/create-user.dto';
import { User } from '../entities';

export abstract class UserRepository {
  abstract findById(id: number): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract createUser(user: CreateUserDTO): Promise<void>;
}

import { CreateUserDTO } from '../dto/Req';
import { User } from '../entities';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract createUser(user: CreateUserDTO): Promise<void>;
}

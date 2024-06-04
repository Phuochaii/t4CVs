import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUserRepository } from '../repository/user.repository';
import { User } from '../schemas/user.schema';
import { CreateUserDTO } from '../../domain/dto/Req';

describe('TypeOrmUserRepository', () => {
  let userRepository: TypeOrmUserRepository;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TypeOrmUserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = moduleRef.get<TypeOrmUserRepository>(
      TypeOrmUserRepository,
    );
    userRepo = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findById', () => {
    it('should return the user with the given id', async () => {
      const userId = '1';
      const user = new User();
      user.id = userId;
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(user);

      const result = await userRepository.findById(userId);

      expect(result).toEqual(user);
      expect(userRepo.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [new User(), new User()];
      jest.spyOn(userRepo, 'find').mockResolvedValue(users);

      const result = await userRepository.findAll();

      expect(result).toEqual(users);
      expect(userRepo.find).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDTO = {
        name: 'John Doe',
        email: 'john@example.com',
      };
      const createdUser = new User();
      createdUser.name = createUserDto.name;
      createdUser.email = createUserDto.email;
      jest.spyOn(userRepo, 'save').mockResolvedValue(createdUser);

      const result = await userRepository.createUser(createUserDto);

      expect(result).toEqual(createdUser);
      expect(userRepo.save).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('isUserExist', () => {
    it('should return true if the user exists', async () => {
      const userId = '1';
      jest.spyOn(userRepo, 'count').mockResolvedValue(1);

      const result = await userRepository.isUserExist(userId);

      expect(result).toBe(true);
      expect(userRepo.count).toHaveBeenCalledWith({ id: userId });
    });

    it('should return false if the user does not exist', async () => {
      const userId = '1';
      jest.spyOn(userRepo, 'count').mockResolvedValue(0);

      const result = await userRepository.isUserExist(userId);

      expect(result).toBe(false);
      expect(userRepo.count).toHaveBeenCalledWith({ id: userId });
    });
  });
});

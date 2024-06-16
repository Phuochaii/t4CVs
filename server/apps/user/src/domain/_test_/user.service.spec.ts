import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../repository';
import { TypeOrmUserRepository } from '../../infrastructure/repository';
import { CreateUserDTO } from '../dto/Req';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    findById: jest.fn(),
    createUser: jest.fn((user) => {
      return;
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: '1',
          name: 'test',
          phone: 'test',
          image: 'test',
        },
        {
          id: '2',
          name: 'test',
          phone: 'test',
          image: 'test',
        },
      ];
    }),
    isUserExist: jest.fn((id: string) => {
      return true;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useFactory: (userRepository: UserRepository) => {
            return new UserService(userRepository);
          },
          inject: [UserRepository],
        },
        {
          provide: UserRepository,
          useClass: TypeOrmUserRepository,
        },
      ],
    })
      .overrideProvider(UserRepository)
      .useValue(mockUserRepository)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    const id = '1';
    it('should return a user', async () => {
      mockUserRepository.findById.mockReturnValueOnce({
        id: id,
        name: 'test',
        phone: 'test',
        image: 'test',
      });
      expect(await service.findById(id)).toEqual({
        id: id,
        name: expect.any(String),
        phone: expect.any(String),
        image: expect.any(String),
      });
    });
    it('should call the repository.findById method with the correct value', async () => {
      expect(mockUserRepository.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('createUser', () => {
    const user: CreateUserDTO = {
      id: '1',
      fullname: 'test',
      phone: 'test',
      image: 'test',
    };
    it('should create a user', async () => {
      await service.createUser(user);
    });
    it('should call the repository.createUser method if the user is not exits', async () => {
      mockUserRepository.findById.mockReturnValueOnce(null);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      expect(await service.findAll()).toEqual(expect.any(Array));
    });
    it('should call the repository.findAll method', async () => {
      expect(mockUserRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('isUserExist', () => {
    const id = '1';
    it('should return true', async () => {
      expect(await service.isUserExist(id)).toStrictEqual(expect.any(Boolean));
    });
    it('should call the repository.isUserExist method with the correct value', async () => {
      expect(mockUserRepository.isUserExist).toHaveBeenCalledWith(id);
    });
  });
});
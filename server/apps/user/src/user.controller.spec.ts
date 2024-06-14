import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './domain/user.service';
import { CreateUserDTO, QueryDTO } from './domain/dto/Req';
import { User } from './domain/entities';
import { FindUserRespDTO } from './domain/dto/Resp/find-users.dto';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    findById: jest.fn((id: string) => {
      return {
        id: id,
        name: 'test',
        phone: 'test',
        image: 'test',
      };
    }),
    createUser: jest.fn((user: CreateUserDTO) => {
      return;
    }),
    findAll: jest.fn((query: QueryDTO) => {
      const users: User[] = [
        {
          id: '1',
          fullname: 'test',
          phone: 'test',
          image: 'test',
        },
        {
          id: '2',
          fullname: 'test',
          phone: 'test',
          image: 'test',
        },
      ];
      const skip =
        (parseInt(String(query.page)) - 1) * parseInt(String(query.limit));
      const result: FindUserRespDTO = {
        page: parseInt(String(query.page)),
        limit: parseInt(String(query.limit)),
        total: users.length,
        total_pages: Math.ceil(users.length / parseInt(String(query.limit))),
        data: users.slice(skip, skip + parseInt(String(query.limit))),
      };
      return result;
    }),
    isUserExist: jest.fn((id: string) => {
      return true;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('findById', () => {
    const id = '1';
    it('should return user by id', () => {
      expect(controller.findById(id)).toEqual({
        id: id,
        name: expect.any(String),
        phone: expect.any(String),
        image: expect.any(String),
      });
    });
    it('should call the service.createUser method with the correct value', async () => {
      expect(mockUserService.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    const user: CreateUserDTO = {
      id: '1',
      fullname: 'test',
      phone: 'test',
      image: 'test',
    };
    it('should create user', () => {
      controller.create(user);
    });
    it('should call the service.createUser method with the correct value', async () => {
      expect(mockUserService.createUser).toHaveBeenCalledWith(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', () => {
      const query = {
        page: 1,
        limit: 10,
      };
      expect(controller.findAll(query)).toEqual({
        page: expect.any(Number),
        limit: expect.any(Number),
        total: expect.any(Number),
        total_pages: expect.any(Number),
        data: expect.any(Array),
      });
    });
    it('should call the service.findAll method', async () => {
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('isUserExist', () => {
    const id = '1';
    it('should return true if user exist', () => {
      expect(controller.isUserExist(id)).toEqual(expect.any(Boolean));
    });
    it('should call the service.isUserExist method with the correct value', async () => {
      expect(mockUserService.isUserExist).toHaveBeenCalledWith(id);
    });
  });
});

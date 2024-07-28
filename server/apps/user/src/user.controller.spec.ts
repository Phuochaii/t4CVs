import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './domain/services/user.service';
import { CreateUserDTO, QueryDTO } from './domain/dto/Req';
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
      const result: FindUserRespDTO = {
        page: Math.floor(Math.random() * 10) + 1,
        limit: Math.floor(Math.random() * 10) + 1,
        total: Math.floor(Math.random() * 20) + 1,
        total_pages: Math.floor(Math.random() * 5) + 1,
        data: [
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
        ],
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
    const query: QueryDTO = {
      page: 1,
      limit: 10,
    };
    it('should return all users', () => {
      const result: FindUserRespDTO = {
        page: expect.any(Number),
        limit: expect.any(Number),
        total: expect.any(Number),
        total_pages: expect.any(Number),
        data: expect.any(Array),
      };
      expect(controller.findAll(query)).toEqual(result);
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

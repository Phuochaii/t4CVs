import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUserRepository } from '../repository/user.repository';
import { User } from '../schemas/user.schema';
import { CreateUserDTO } from '../../domain/dto/Req';

describe('TypeOrmUserRepository', () => {
  let typeOrmUserRepository: TypeOrmUserRepository;
  const mockUserRepository = {
    findOne: jest.fn().mockImplementation((query) =>
      Promise.resolve({
        id: query.where.id,
        fullname: 'John Doe',
        phone: '1234567890',
        image: 'image.png',
      }),
    ),
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: '1',
          fullname: 'John Doe',
          phone: '1234567890',
          image: 'image.png',
        },
        {
          id: '2',
          fullname: 'Jane Doe',
          phone: '0987654321',
          image: 'image2.png',
        },
      ]),
    ),
    save: jest.fn().mockImplementation((user) => Promise.resolve(user)),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TypeOrmUserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    typeOrmUserRepository = moduleRef.get<TypeOrmUserRepository>(
      TypeOrmUserRepository,
    );
  });

  describe('findById', () => {
    const userId = '1';
    it('should return the user with the given id', async () => {
      expect(await typeOrmUserRepository.findById(userId)).toEqual({
        id: userId,
        fullname: expect.any(String),
        phone: expect.any(String),
        image: expect.any(String),
      });
    });
    it('should call the userRepository.findOne() method with the correct query', async () => {
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      expect(await typeOrmUserRepository.findAll()).toEqual(expect.any(Array));
    });
    it('should call the userRepository.find() method', async () => {
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    const user: CreateUserDTO = {
      id: '3',
      fullname: 'John Doe',
      phone: '1234567890',
      image: 'image.png',
    };
    it('should return the created user', async () => {
      expect(await typeOrmUserRepository.createUser(user)).toEqual(user);
    });
    it('should call the userRepository.save() method with the correct user', async () => {
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('isUserExist', () => {
    const userId = '1';
    it('should return true if the user exists', async () => {
      expect(await typeOrmUserRepository.isUserExist(userId)).toBe(true);
    });
    it('should return false if the user does not exist', async () => {
      mockUserRepository.findOne.mockReturnValueOnce(null);
      expect(await typeOrmUserRepository.isUserExist('4')).toBe(false);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/test/testUtil';
import { User } from './user.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

describe('UserController', () => {
  let controller: UserController;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    beforeEach(async () => {
      mockRepository.create.mockReset();
      mockRepository.save.mockReset();
      mockRepository.find.mockReset();
      mockRepository.findOne.mockReset();
      mockRepository.update.mockReset();
      mockRepository.delete.mockReset();
    });

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = TestUtil.giveAUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);
      const savedUser = await controller.create(user);

      expect(savedUser).toMatchObject(user);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should be list all users', async () => {
      const user = TestUtil.giveAUser();
      mockRepository.find.mockReturnValue([user, user]);
      const users = await controller.findAll();

      expect(users).toMatchObject([user, user]);
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should find a existing user', async () => {
      const user = TestUtil.giveAUser();
      mockRepository.findOne.mockReturnValue(user);
      const userFound = await controller.findOne(user.id);

      expect(userFound).toMatchObject(user);
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = TestUtil.giveAUser();
      const updatedUser = TestUtil.giveAUpdatedUser();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue({
        ...user,
        ...updatedUser,
      });
      mockRepository.create.mockReturnValue({
        ...user,
        ...updatedUser,
      });

      const resultUser = await controller.update(user.id, {
        ...user,
        ...updatedUser,
      });

      expect(resultUser).toMatchObject(updatedUser);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a existing user', async () => {
      const user = TestUtil.giveAUser();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(user);
      const removedUser = await controller.remove(user.id);

      expect(removedUser).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});

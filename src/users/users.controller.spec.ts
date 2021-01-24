import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, PrismaClient } from '@prisma/client';
import { validUser } from '../../test/testUtil';
import { PrismaService } from '../prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const prisma = new PrismaClient();

  const user = validUser();
  const returnedUser: Prisma.UserWhereInput = {
    name: user.name,
    email: user.email,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [PrismaService, UsersService],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  afterAll(async (done) => {
    await prisma.$disconnect();
    done();
  });

  describe('Create User', () => {
    it('should create a user', async () => {
      const res = await controller.create(user);
      expect(res).toMatchObject(returnedUser);
    });
  });

  describe('Find Users', () => {
    it('should be list all users', async () => {
      const res = await controller.findAll();
      expect(res[0]).toMatchObject(returnedUser);
      expect(res).toHaveLength(1);
    });
  });

  describe('Find User', () => {
    it('should find a existing user', async () => {
      const res = await controller.findOne('1');

      expect(res).toMatchObject(returnedUser);
    });
  });

  describe('Update User', () => {
    it('should update a user', async () => {
      const res = await controller.update('1', user);

      expect(res).toMatchObject(returnedUser);
    });
  });

  describe('Delete User', () => {
    it('should remove a existing user', async () => {
      const res = await controller.remove('1');

      expect(res).toMatchObject(returnedUser);
    });
  });
});

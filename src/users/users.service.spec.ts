import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, PrismaClient } from '@prisma/client';
import { validUser } from '../../test/testUtil';
import { PrismaService } from '../prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const prisma = new PrismaClient();

  const user = validUser();
  const returnedUser: Prisma.UserWhereInput = {
    name: user.name,
    email: user.email,
  };
  const UserWhereUniqueInput: Prisma.UserWhereUniqueInput = {
    email: user.email,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  afterAll(async (done) => {
    await prisma.$disconnect();
    done();
  });

  describe('Create User', () => {
    it('should create a user', async () => {
      const res = await service.create(user);
      expect(res).toMatchObject(returnedUser);
    });
  });

  describe('Find Users', () => {
    it('should be list all users', async () => {
      const res = await service.findAll();
      expect(res[0]).toMatchObject(returnedUser);
      expect(res).toHaveLength(1);
    });
  });

  describe('Find User', () => {
    it('should find a existing user', async () => {
      const res = await service.findOne(UserWhereUniqueInput);

      expect(res).toMatchObject(returnedUser);
    });
  });

  describe('Update User', () => {
    it('should update a user', async () => {
      const res = await service.update(UserWhereUniqueInput, user);

      expect(res).toMatchObject(returnedUser);
    });
  });

  describe('Delete User', () => {
    it('should remove a existing user', async () => {
      const res = await service.remove(UserWhereUniqueInput);

      expect(res).toMatchObject(returnedUser);
    });
  });
});

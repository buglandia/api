import { Prisma } from '@prisma/client';
import * as faker from 'faker';

export const validUser = (): Prisma.UserCreateInput => {
  const user: Prisma.UserCreateInput = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  return user;
};

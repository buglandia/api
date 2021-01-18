import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

const userSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  username: true,
  password: false,
  status: false,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(
    data: Prisma.UserCreateInput,
  ): Prisma.Prisma__UserClient<Record<string, unknown>> {
    return this.prisma.user.create({ data, select: userSelect });
  }

  findAll(): Promise<Record<string, unknown>[]> {
    return this.prisma.user.findMany({ select: userSelect });
  }

  findOne(
    where: Prisma.UserWhereUniqueInput,
  ): Prisma.Prisma__UserClient<Record<string, unknown>> {
    return this.prisma.user.findUnique({
      where,
      select: userSelect,
    });
  }

  update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Prisma.Prisma__UserClient<Record<string, unknown>> {
    return this.prisma.user.update({ where, data, select: userSelect });
  }

  remove(
    where: Prisma.UserWhereUniqueInput,
  ): Prisma.Prisma__UserClient<Record<string, unknown>> {
    return this.prisma.user.delete({ where, select: userSelect });
  }
}

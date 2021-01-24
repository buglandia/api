import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async create(data: Prisma.UserCreateInput) {
    try {
      return await this.prisma.user.create({ data, select: userSelect });
    } catch (error) {
      throw new InternalServerErrorException('Error to create user, try again');
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({ select: userSelect });
    } catch (error) {
      throw new InternalServerErrorException('Error to find users, try again');
    }
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where,
      select: userSelect,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    const user = await this.prisma.user.findUnique({ where });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      return await this.prisma.user.update({
        where: { id: user.id },
        data,
        select: userSelect,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error to update a user, try again',
      );
    }
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({ where });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      return await this.prisma.user.delete({
        where: { id: user.id },
        select: userSelect,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error to remove user, try again');
    }
  }
}

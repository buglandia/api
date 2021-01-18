import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.create(data);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.usersService.update({ id: +id }, data);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: +id });
  }
}

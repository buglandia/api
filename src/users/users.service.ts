import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    const data = this.userRepository.create(user);
    const userSaved = await this.userRepository.save(data);
    if (!userSaved) {
      throw new InternalServerErrorException(
        'Problem to create a user. Try again',
      );
    }
    return userSaved;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, userToUpdate: User): Promise<User> {
    const user = await this.userRepository.findOne(id);
    await this.userRepository.update(user, { ...userToUpdate });
    const userUpdated = this.userRepository.create({
      ...user,
      ...userToUpdate,
    });
    return userUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne(id);
    const deleted = await this.userRepository.delete(user.id);
    if (deleted) {
      return true;
    }
    return false;
  }
}

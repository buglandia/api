import * as faker from 'faker';
import { User } from './../../users/user.entity';

export default class TestUtil {
  static giveAMeAValidUser(): User {
    const user = new User();
    user.id = faker.random.alphaNumeric(18);
    user.name = faker.name.findName();
    user.userName = faker.internet.userName();
    user.isActive = faker.random.boolean();
    return user;
  }
}
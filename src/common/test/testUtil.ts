import * as faker from 'faker';
import { User } from './../../users/user.entity';

export default class TestUtil {
  static giveAUser(): User {
    const user = new User();
    user.id = faker.random.alphaNumeric(18);
    user.name = faker.name.findName();
    user.userName = faker.internet.userName();
    user.admin = faker.random.boolean();
    user.password = faker.internet.password();
    user.token = faker.random.alphaNumeric();
    user.isActive = faker.random.boolean();
    return user;
  }
  static giveAUpdatedUser(): User {
    const user = new User();
    user.name = faker.name.findName();
    user.userName = faker.internet.userName();
    user.admin = faker.random.boolean();
    user.password = faker.internet.password();
    user.token = faker.random.alphaNumeric();
    user.isActive = faker.random.boolean();
    return user;
  }
}

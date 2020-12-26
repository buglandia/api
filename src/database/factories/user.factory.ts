import { User } from '../../users/user.entity';
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.id = faker.random.alphaNumeric(18);
  user.name = faker.name.findName();
  user.userName = faker.internet.userName();
  user.isActive = faker.random.boolean();
  return user;
});

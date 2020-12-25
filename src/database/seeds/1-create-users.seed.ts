import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../users/user.entity';

export default class CreateOffers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().createMany(5);
  }
}

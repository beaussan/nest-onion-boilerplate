import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import Optional from 'typescript-optional';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneById(id: number): Promise<Optional<User>> {
    return Optional.ofNullable(await this.findOne(id, {}));
  }
}

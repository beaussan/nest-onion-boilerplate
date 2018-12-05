import { EntityRepository, Repository } from 'typeorm';
import { Roles } from './roles.entity';
import Optional from 'typescript-optional';

@EntityRepository(Roles)
export class RolesRepository extends Repository<Roles> {
  async findOneById(id: number): Promise<Optional<Roles>> {
    return Optional.ofNullable(await this.findOne(id, {}));
  }
}

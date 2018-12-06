import { Role } from './roles.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesRepository } from './roles.repository';
import { USER_ROLE, ADMIN_ROLE } from './roles.constants';
import { RolesDto } from './roles.dto';
import Optional from 'typescript-optional';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository)
    private readonly rolesRepository: RolesRepository,
  ) {
    this.init();
  }

  async init(): Promise<void> {
    for (const role in [USER_ROLE, ADMIN_ROLE]) {
      if ((await this.rolesRepository.findRoleByName(role)).isEmpty) {
        const roleDb = new Role();
        roleDb.name = role;
        await this.rolesRepository.save(roleDb);
      }
    }
  }

  async getAll(): Promise<Role[]> {
    return this.rolesRepository.find({});
  }

  async getOneById(id: number): Promise<Optional<Role>> {
    return this.rolesRepository.findOneById(id);
  }

  async saveNew(body: RolesDto): Promise<Role> {
    let rolesNew = new Role();

    // Complete with the mappings

    rolesNew = await this.rolesRepository.save(rolesNew);

    return rolesNew;
  }

  async update(id: number, body: RolesDto): Promise<Role> {
    let rolesFound = (await this.rolesRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );

    // Complete with the mappings

    rolesFound = await this.rolesRepository.save(rolesFound);

    return rolesFound;
  }

  async deleteById(id: number): Promise<void> {
    const rolesFound = (await this.rolesRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
    await this.rolesRepository.remove(rolesFound);
  }
}

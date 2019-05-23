import { Role } from './roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesRepository } from './roles.repository';
import { USER_ROLE, ADMIN_ROLE } from './roles.constants';
import { Optional } from 'typescript-optional';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository)
    private readonly rolesRepository: RolesRepository,
  ) {
    this.init();
  }

  async init(): Promise<void> {
    for (const role of [USER_ROLE, ADMIN_ROLE]) {
      if ((await this.rolesRepository.findRoleByName(role)).isEmpty()) {
        const roleDb = new Role(role);
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

  async getUserRole(): Promise<Role> {
    return (await this.rolesRepository.findRoleByName(USER_ROLE)).get();
  }

  async getAdminRole(): Promise<Role> {
    return (await this.rolesRepository.findRoleByName(ADMIN_ROLE)).get();
  }
}

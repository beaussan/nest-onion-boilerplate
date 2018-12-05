import { Roles } from './roles.entity';
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
  ) {}

  async getAll(): Promise<Roles[]> {
    return this.rolesRepository.find({});
  }

  async getOneById(id: number): Promise<Optional<Roles>> {
    return this.rolesRepository.findOneById(id);
  }

  async saveNew(body: RolesDto): Promise<Roles> {
    let rolesNew = new Roles();

    // Complete with the mappings

    rolesNew = await this.rolesRepository.save(rolesNew);

    return rolesNew;
  }

  async update(id: number, body: RolesDto): Promise<Roles> {
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

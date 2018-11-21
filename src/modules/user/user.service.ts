import { User } from './user.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
// import {  } from './user.constants';
import { UserDto } from './user.dto';
import Optional from 'typescript-optional';
import { CryptoService } from '../core/crypto/crypto.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async getOneById(id: number): Promise<Optional<User>> {
    return this.userRepository.findOneById(id);
  }

  async saveNew(app: UserDto): Promise<User> {
    let userNew = new User();

    userNew.password = await this.cryptoService.hash(app.password);
    userNew.email = app.email;

    userNew = await this.userRepository.save(userNew);

    return userNew;
  }

  async update(id: number, body: UserDto): Promise<User> {
    let userFound = (await this.userRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );

    userFound.password = await this.cryptoService.hash(body.password);
    userFound.email = body.email;

    userFound = await this.userRepository.save(userFound);

    return userFound;
  }

  async deleteById(id: number): Promise<void> {
    const userFound = (await this.userRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
    await this.userRepository.remove(userFound);
  }
}

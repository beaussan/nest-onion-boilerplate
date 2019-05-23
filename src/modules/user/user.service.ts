import { User } from './user.entity';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
// import {  } from './user.constants';
import {
  UserDtoRegister,
  UserDtoUpdateInfo,
  UserDtoUpdatePassword,
} from './user.dto';
import { Optional } from 'typescript-optional';
import { CryptoService } from '../core/crypto/crypto.service';
import { Role } from '../roles/roles.entity';
import { Roles } from '../../decorators/roles.decorator';
import { USER_ROLE } from '../roles/roles.constants';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly rolesSercie: RolesService,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async getOneById(id: number): Promise<Optional<User>> {
    return this.userRepository.findOneById(id);
  }

  async getOnWithEmail(email: string): Promise<Optional<User>> {
    return await this.userRepository.findOneWithEmail(email);
  }

  async doPasswordMatch(user: User, password: string): Promise<boolean> {
    return this.cryptoService.compare(password, user.password);
  }

  async saveNew(userRegister: UserDtoRegister): Promise<User> {
    if (
      await this.userRepository.hasUserWithMatchingEmail(
        userRegister.email.toLowerCase(),
      )
    ) {
      throw new ConflictException('Email already taken');
    }

    let userNew = new User();

    const userRole = await this.rolesSercie.getUserRole();

    userNew.password = await this.cryptoService.hash(userRegister.password);
    userNew.email = userRegister.email.toLowerCase();
    userNew.lastName = userRegister.lastName;
    userNew.firstName = userRegister.firstName;
    userNew.roles = [userRole];

    userNew = await this.userRepository.save(userNew);

    return userNew;
  }

  async update(id: number, body: UserDtoUpdateInfo): Promise<User> {
    let userFound = (await this.userRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );

    userFound.firstName = body.firstName;
    userFound.lastName = body.lastName;

    userFound = await this.userRepository.save(userFound);

    return userFound;
  }

  async updatePassword(id: number, body: UserDtoUpdatePassword): Promise<User> {
    let userFound = (await this.userRepository.findOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );

    if (!this.doPasswordMatch(userFound, body.oldPassword)) {
      throw new BadRequestException('Old password do not match');
    }

    if (body.newPassword !== body.newPasswordBis) {
      throw new BadRequestException('New passwords are not the same');
    }

    userFound.password = await this.cryptoService.hash(body.newPassword);

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

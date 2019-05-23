import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from '../roles/roles.entity';
import { ADMIN_ROLE } from '../roles/roles.constants';

@Entity()
export class User extends DbAuditModel {
  @Column()
  @ApiModelProperty({ example: 'foo@bar.fr' })
  email: string;

  @Column()
  @ApiModelProperty()
  firstName: string;

  @Column()
  @ApiModelProperty()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];

  isAdmin(): boolean {
    return !!(this.roles || []).find(role => role.name === ADMIN_ROLE);
  }
}

import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends DbAuditModel {
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
}

import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Role extends DbAuditModel {
  @ApiModelProperty({ required: true, readOnly: true })
  @Column({ unique: true })
  name: string;
}

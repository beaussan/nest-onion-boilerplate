import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Role extends DbAuditModel {
  constructor(name: string) {
    super();
    this.name = name;
  }

  @ApiModelProperty({ required: true, readOnly: true })
  @Column({ unique: true })
  name: string;
}

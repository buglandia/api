import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'character varying' })
  id: string;

  @Column()
  name: string;

  @Column()
  userName: string;

  @CreateDateColumn({ name: 'createdAt', precision: 3 })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt', precision: 3 })
  readonly updatedAt?: Date;

  @Column({ default: true })
  isActive: boolean;
}

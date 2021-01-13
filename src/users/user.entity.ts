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

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  userName: string;

  @Column({ select: false, nullable: false })
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  admin: boolean;

  @CreateDateColumn({ name: 'createdAt', precision: 3 })
  readonly createdAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt', precision: 3 })
  readonly updatedAt?: Date;
}

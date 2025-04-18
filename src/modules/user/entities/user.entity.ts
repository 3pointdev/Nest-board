import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Unique(['account'])
  account: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({ default: false })
  @Exclude()
  isDeleted: boolean;
}

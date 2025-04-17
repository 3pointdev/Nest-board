import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  @Exclude()
  isDeleted: boolean;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}

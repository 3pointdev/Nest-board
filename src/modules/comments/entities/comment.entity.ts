import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: false })
  @Exclude()
  isDeleted: boolean;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}

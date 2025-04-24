import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { PostsService } from '../../posts/services/posts.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Post } from 'src/modules/posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
  ) {}

  async create(
    parentId: number,
    userId: number,
    createCommentDto: any,
  ): Promise<any> {
    return {};
  }

  async findAll(parentId: number, paginationDto: PaginationDto): Promise<any> {
    return [];
  }

  async update(
    parentId: number,
    id: number,
    userId: number,
    updateCommentDto: any,
  ): Promise<any> {
    return {};
  }

  async delete(parentId: number, id: number, userId: number): Promise<void> {
    return;
  }
}

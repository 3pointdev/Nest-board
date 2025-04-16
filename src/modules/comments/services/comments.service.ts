import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { PostsService } from '../../posts/services/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private postsService: PostsService,
  ) {}

  async create(
    postId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const post = await this.postsService.findOne(postId);
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      post,
    });
    return this.commentsRepository.save(comment);
  }

  async findAll(postId: number): Promise<Comment[]> {
    await this.postsService.findOne(postId);
    return this.commentsRepository.find({ where: { post: { id: postId } } });
  }

  async findOne(postId: number, id: number): Promise<Comment> {
    await this.postsService.findOne(postId);
    const comment = await this.commentsRepository.findOne({
      where: { id, post: { id: postId } },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(
    postId: number,
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findOne(postId, id);
    Object.assign(comment, updateCommentDto);
    return this.commentsRepository.save(comment);
  }

  async delete(postId: number, id: number): Promise<void> {
    await this.postsService.findOne(postId);
    const result = await this.commentsRepository.delete({
      id,
      post: { id: postId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}

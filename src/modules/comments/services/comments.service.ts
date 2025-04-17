import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { PostsService } from '../../posts/services/posts.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate, PaginatedResponse } from 'src/common/utils/pagination.util';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private postsService: PostsService,
  ) {}

  async create(
    parentId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment[]> {
    const { content } = createCommentDto;
    if (!content) {
      throw new NotFoundException(`No content.`);
    }
    if (content.length < 5) {
      throw new NotFoundException(`Content must be at least 5 characters.`);
    }

    const post = await this.postsService.findOne(parentId);

    const comment = this.commentsRepository.create({
      ...createCommentDto,
      post,
    });

    await this.commentsRepository.save(comment);

    return (await this.findAll(parentId, { page: 1, limit: 5 })).list;
  }

  async findAll(
    parentId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Comment>> {
    await this.postsService.findOne(+parentId);
    return paginate<Comment>(this.commentsRepository, paginationDto, {
      where: { post: { id: parentId, isDeleted: false }, isDeleted: false },
      order: { id: 'DESC' },
    });
  }

  async findOne(parentId: number, id: number): Promise<Comment> {
    await this.postsService.findOne(parentId);

    const comment = await this.commentsRepository.findOne({
      where: { id, isDeleted: false },
    });

    if (!comment || comment.isDeleted) {
      throw new NotFoundException(
        `This comment does not exist or has already been deleted.`,
      );
    }

    return comment;
  }

  async update(
    parentId: number,
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const { content } = updateCommentDto;

    if (!content) {
      throw new NotFoundException(`No content.`);
    }

    if (content && content.length < 5) {
      throw new NotFoundException(`Content must be at least 5 characters.`);
    }

    const comment = await this.findOne(parentId, id);

    Object.assign(comment, updateCommentDto);

    return this.commentsRepository.save(comment);
  }

  async delete(parentId: number, id: number): Promise<void> {
    await this.postsService.findOne(parentId);
    await this.commentsRepository.update(id, { isDeleted: true });
  }
}

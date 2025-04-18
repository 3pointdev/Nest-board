import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Query,
  Req,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentDto } from '../dtos/comment.dto';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthenticatedRequest } from 'src/types/index';
import {
  CommentCreateSwagger,
  CommentDeleteSwagger,
  CommentFindListSwagger,
  CommentFindOneSwagger,
  CommentSwagger,
  CommentUpdateSwagger,
} from '../swagger/comment.swagger';

@Controller('posts/:parentId/comments')
@CommentSwagger()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @CommentCreateSwagger()
  create(
    @Req() req: AuthenticatedRequest,
    @Param('parentId') parentId: number,
    @Body() createCommentDto: CommentDto,
  ) {
    const userId = req.user.sub;
    return this.commentsService.create(+parentId, +userId, createCommentDto);
  }

  @Get()
  @CommentFindListSwagger()
  findAll(
    @Param('parentId') parentId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.commentsService.findAll(+parentId, paginationDto);
  }

  @Get(':id')
  @CommentFindOneSwagger()
  findOne(@Param('parentId') parentId: number, @Param('id') id: number) {
    return this.commentsService.findOne(+parentId, +id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @CommentUpdateSwagger()
  update(
    @Req() req: AuthenticatedRequest,
    @Param('parentId') parentId: number,
    @Param('id') id: number,
    @Body() updateCommentDto: CommentDto,
  ) {
    const userId = req.user.sub;
    return this.commentsService.update(
      +parentId,
      +id,
      +userId,
      updateCommentDto,
    );
  }

  @Delete(':id')
  @CommentDeleteSwagger()
  delete(
    @Req() req: AuthenticatedRequest,
    @Param('parentId') parentId: number,
    @Param('id') id: number,
  ) {
    const userId = req.user.sub;
    return this.commentsService.delete(+parentId, +id, +userId);
  }
}

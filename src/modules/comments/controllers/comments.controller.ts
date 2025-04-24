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
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthenticatedRequest } from 'src/types/index';
import {
  CommentCreateSwagger,
  CommentDeleteSwagger,
  CommentFindListSwagger,
  CommentSwagger,
  CommentUpdateSwagger,
} from '../swagger/comment.swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import CreateCommentDto from '../dtos/createComment.dto';

@Controller('posts/:parentId/comments')
@CommentSwagger()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @CommentCreateSwagger()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req: AuthenticatedRequest,
    @Param('parentId') parentId: number,
    @Body() createCommentDto: CreateCommentDto,
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

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @CommentUpdateSwagger()
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('parentId') parentId: number,
    @Param('id') id: number,
    @Body() updateCommentDto: CreateCommentDto,
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
  @UseGuards(JwtAuthGuard)
  delete(
    @Req() req: AuthenticatedRequest,
    @Param('parentId') parentId: number,
    @Param('id') id: number,
  ) {
    const userId = req.user.sub;
    return this.commentsService.delete(+parentId, +id, +userId);
  }
}

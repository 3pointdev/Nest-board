import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(+postId, createCommentDto);
  }

  @Get()
  findAll(@Param('postId') postId: string) {
    return this.commentsService.findAll(+postId);
  }

  @Get(':id')
  findOne(@Param('postId') postId: string, @Param('id') id: string) {
    return this.commentsService.findOne(+postId, +id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+postId, +id, updateCommentDto);
  }

  @Delete(':id')
  delete(@Param('postId') postId: string, @Param('id') id: string) {
    return this.commentsService.delete(+postId, +id);
  }
}

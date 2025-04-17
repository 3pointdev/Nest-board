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
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('posts/:parentId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Param('parentId') parentId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(+parentId, createCommentDto);
  }

  @Get()
  findAll(
    @Param('parentId') parentId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.commentsService.findAll(+parentId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('parentId') parentId: number, @Param('id') id: number) {
    return this.commentsService.findOne(+parentId, +id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('parentId') parentId: number,
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+parentId, +id, updateCommentDto);
  }

  @Delete(':id')
  delete(@Param('parentId') parentId: number, @Param('id') id: number) {
    return this.commentsService.delete(+parentId, +id);
  }
}

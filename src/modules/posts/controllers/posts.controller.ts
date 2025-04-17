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
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(+id);
  }
}

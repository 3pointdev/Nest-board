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
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types/index';
import {
  PostCreateSwagger,
  PostDeleteSwagger,
  PostFindListSwagger,
  PostFindOneSwagger,
  PostSwagger,
  PostUpdateSwagger,
} from '../swagger/post.swagger';
import CreatePostDto from '../dtos/createPost.dto';
import PostModel from '../models/post.model';

@Controller('posts')
@PostSwagger()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @PostCreateSwagger()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostModel> {
    const userId = req.user.sub;
    return this.postsService.create(userId, createPostDto);
  }

  @Get()
  @PostFindListSwagger()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  @Get(':id')
  @PostFindOneSwagger()
  findOne(@Param('id') id: string): Promise<any> {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @PostUpdateSwagger()
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updatePostDto: any,
  ): Promise<any> {
    const userId = req.user.sub;
    return this.postsService.update(+id, userId, updatePostDto);
  }

  @Delete(':id')
  @PostDeleteSwagger()
  @UseGuards(JwtAuthGuard)
  delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.postsService.delete(+id, userId);
  }
}

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
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
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

@Controller('posts')
@UseGuards(JwtAuthGuard)
@PostSwagger()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @PostCreateSwagger()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createPostDto: CreatePostDto,
  ) {
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
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @PostUpdateSwagger()
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const userId = req.user.sub;
    return this.postsService.update(+id, userId, updatePostDto);
  }

  @Delete(':id')
  @PostDeleteSwagger()
  delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.postsService.delete(+id, userId);
  }
}

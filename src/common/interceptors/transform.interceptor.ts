import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { Post } from '../../modules/posts/entities/post.entity';
import { Comment } from '../../modules/comments/entities/comment.entity';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private readonly entityMap: { [key: string]: any } = {
    posts: Post,
    comments: Comment,
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const entityKey = request.url.includes('comments') ? 'comments' : 'posts';
    const entityClass = this.entityMap[entityKey] || Post;

    if (!entityClass) throw new NotFoundException('Response Failed');

    return next.handle().pipe(
      map((data) => {
        if (data && 'list' in data && 'total' in data) {
          return {
            ...data,
            list: plainToInstance(entityClass, data.list, {
              excludeExtraneousValues: false,
            }),
          };
        }

        return plainToInstance(entityClass, data, {
          excludeExtraneousValues: false,
        });
      }),
    );
  }
}

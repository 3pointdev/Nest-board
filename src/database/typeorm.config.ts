import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Post } from '../modules/posts/entities/post.entity';
import { Comment } from '../modules/comments/entities/comment.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3306),
  username: configService.get<string>('DB_USERNAME', 'root'),
  password: configService.get<string>('DB_PASSWORD', ''),
  database: configService.get<string>('DB_NAME', 'board_db'),
  entities: [Post, Comment, User],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: configService.get<boolean>('DB_SYNC', false),
  logging: configService.get<boolean>('DB_LOGGING', true),
});

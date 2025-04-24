import { Expose, Type } from 'class-transformer';
import { AuthorModel } from 'src/modules/user/models/author.model';

export default class PostListModel {
  @Expose({ name: 'id' })
  id: number;

  @Expose({ name: 'title' })
  title: string;

  @Expose({ name: 'createdAt' })
  createdAt: string;

  @Expose({ name: 'updatedAt' })
  updatedAt: string;

  @Expose({ name: 'author' })
  @Type(() => AuthorModel)
  author: AuthorModel;
}

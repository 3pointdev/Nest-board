import { Expose } from 'class-transformer';

export class PaginationModel<T> {
  @Expose({ name: 'list' })
  list: T[];

  @Expose({ name: 'total' })
  total: number;

  @Expose({ name: 'page' })
  page: number;

  @Expose({ name: 'limit' })
  limit: number;
}

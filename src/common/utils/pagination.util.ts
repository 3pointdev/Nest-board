import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PaginationModel } from '../models/pagination.model';

export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  limit: number;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: '조회 된 한 페이지 데이터 목록',
    type: 'array',
    items: { type: 'object' },
    example: [],
  })
  list: T[];

  @ApiProperty({ description: '데이터의 총 갯수', example: 10 })
  total: number;

  @ApiProperty({ description: '현재 페이지', example: 1 })
  page: number;

  @ApiProperty({ description: '한 페이지에 표시할 데이터 갯수', example: 5 })
  limit: number;
}

export async function paginate<T>(
  repository: any,
  paginationDto: { page: number; limit: number },
  options: {
    where?: any;
    relations?: string[];
    order?: any;
    select?: any;
  } = {},
): Promise<PaginatedResponse<T>> {
  const { page = 1, limit = 5 } = paginationDto;

  const skip = (page - 1) * limit;

  const [data, total] = await repository.findAndCount({
    where: { ...options.where, isDeleted: false },
    relations: options.relations,
    skip,
    take: limit,
    order: options.order || { id: 'DESC' },
  });

  return plainToInstance(PaginationModel<T>, {
    list: data,
    total,
    page,
    limit,
  });
}

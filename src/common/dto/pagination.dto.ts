import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    description: '요청하는 페이지 번호',
    default: 1,
    required: false,
    type: Number,
    minimum: 1,
    example: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @ApiProperty({
    description: '한 페이지에 보여줄 데이터 개수',
    default: 5,
    required: false,
    type: Number,
    minimum: 1,
    example: 5,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit: number = 5;
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthorModel {
  @Expose({ name: 'id' })
  @ApiProperty({
    description: '작성자 ID',
    example: 1,
  })
  id: number;

  @Expose({ name: 'account' })
  @ApiProperty({
    description: '작성자 계정',
    example: '작성자 계정',
  })
  account: string;
}

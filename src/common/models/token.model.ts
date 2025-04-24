import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenModel {
  @Expose({ name: 'accessToken' })
  @ApiProperty({
    description: 'accessToken',
    example: 'askjvhaklvfhadfkvhadfklv',
  })
  accessToken: string;

  @Expose({ name: 'refreshToken' })
  @ApiProperty({
    description: 'refreshToken',
    example: 'afkjvhadfklvhadfklvhdfalkv',
  })
  refreshToken: string;
}

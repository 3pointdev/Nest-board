import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('ping')
@ApiTags('Ping 테스트')
export class PingController {
  @Get()
  @ApiOperation({ summary: 'Ping 테스트' })
  @ApiResponse({
    status: 200,
    description: '성공',
    example: `Pong Welcome to the ping service!`,
  })
  Ping() {
    return `<html>
    <body>
      <h1>Pong</h1>
      <p>Welcome to the ping service!</p>
    </body>
    </html>`;
  }
}

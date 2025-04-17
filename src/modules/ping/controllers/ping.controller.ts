import { Controller, Get } from '@nestjs/common';

@Controller('ping')
export class PingController {
  @Get()
  Ping() {
    return `<html>
    <body>
      <h1>Pong</h1>
      <p>Welcome to the ping service!</p>
    </body>
    </html>`;
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PingController } from './controllers/ping.controller';
import { PingService } from './services/ping.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [PingController],
  providers: [PingService],
  exports: [PingService],
})
export class PingModule {}

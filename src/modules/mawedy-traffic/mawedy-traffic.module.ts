import { Module } from '@nestjs/common';
import { MawedyTrafficService } from './mawedy-traffic.service';
import { MawedyTrafficController } from './mawedy-traffic.controller';

@Module({
  controllers: [MawedyTrafficController],
  providers: [MawedyTrafficService]
})
export class MawedyTrafficModule {}

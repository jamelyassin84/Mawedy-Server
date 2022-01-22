import { Module } from '@nestjs/common';
import { MawedySessionService } from './mawedy-session.service';
import { MawedySessionController } from './mawedy-session.controller';

@Module({
  controllers: [MawedySessionController],
  providers: [MawedySessionService]
})
export class MawedySessionModule {}

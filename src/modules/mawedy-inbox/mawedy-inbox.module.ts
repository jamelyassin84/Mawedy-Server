import { Module } from '@nestjs/common';
import { MawedyInboxService } from './mawedy-inbox.service';
import { MawedyInboxController } from './mawedy-inbox.controller';

@Module({
  controllers: [MawedyInboxController],
  providers: [MawedyInboxService]
})
export class MawedyInboxModule {}

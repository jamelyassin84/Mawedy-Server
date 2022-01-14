import { Module } from '@nestjs/common';
import { MawedyImagesService } from './mawedy-images.service';
import { MawedyImagesController } from './mawedy-images.controller';

@Module({
  controllers: [MawedyImagesController],
  providers: [MawedyImagesService]
})
export class MawedyImagesModule {}

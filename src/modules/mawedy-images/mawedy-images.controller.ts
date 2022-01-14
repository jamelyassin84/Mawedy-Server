import { Controller } from '@nestjs/common';
import { MawedyImagesService } from './mawedy-images.service';

@Controller('mawedy-images')
export class MawedyImagesController {
  constructor(private readonly mawedyImagesService: MawedyImagesService) {}
}

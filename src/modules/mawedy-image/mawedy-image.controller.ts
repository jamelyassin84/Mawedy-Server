import { Controller } from '@nestjs/common'
import { MawedyImagesService } from './mawedy-image.service'

@Controller('mawedy-images')
export class MawedyImagesController {
	constructor(private readonly mawedyImagesService: MawedyImagesService) {}
}

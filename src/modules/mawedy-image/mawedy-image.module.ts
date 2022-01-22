import { Module } from '@nestjs/common'
import { MawedyImagesService } from './mawedy-image.service'
import { MawedyImagesController } from './mawedy-image.controller'

@Module({
	controllers: [MawedyImagesController],
	providers: [MawedyImagesService],
})
export class MawedyImagesModule {}

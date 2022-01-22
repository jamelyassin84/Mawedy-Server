import { MawedyImagesDto } from './mawedy-image.dto'
import { MawedyImages } from './mawedy-image.entity'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { MawedyImagesService } from './mawedy-image.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('App Images')
@Controller(resolveAPI(ROUTES.APP_IMAGES))
export class MawedyImagesController {
	constructor(private readonly service: MawedyImagesService) {}
	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<MawedyImages[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<MawedyImages> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: MawedyImagesDto): Promise<MawedyImages> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: MawedyImagesDto,
	): Promise<MawedyImages> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<MawedyImages> {
		return this.service.remove(+param.id)
	}
}

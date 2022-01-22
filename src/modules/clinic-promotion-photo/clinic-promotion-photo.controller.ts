import { ClinicPromotionPhoto } from './clinic-promotion-photo.entity'
import { ClinicPromotionPhotoDto } from './clinic-promotion-photo.dto'
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
import { ClinicPromotionPhotoService } from './clinic-promotion-photo.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Promotion Photos')
@Controller(resolveAPI(ROUTES.CLINIC_PROMOTIONS_PHOTOS))
export class ClinicPromotionPhotoController {
	constructor(private readonly service: ClinicPromotionPhotoService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicPromotionPhoto[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicPromotionPhoto> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: ClinicPromotionPhotoDto,
	): Promise<ClinicPromotionPhoto> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicPromotionPhotoDto,
	): Promise<ClinicPromotionPhoto> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicPromotionPhoto> {
		return this.service.remove(+param.id)
	}
}

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
import { DoctorRatingDto } from './doctor-rating.dto'
import { DoctorRating } from './doctor-rating.entity'
import { DoctorRatingService } from './doctor-rating.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Doctor Ratings')
@Controller(resolveAPI(ROUTES.DOCTOR_RATINGS))
export class DoctorRatingController {
	constructor(private readonly service: DoctorRatingService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<DoctorRating[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<DoctorRating> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: DoctorRatingDto): Promise<DoctorRating> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: DoctorRatingDto,
	): Promise<DoctorRating> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<DoctorRating> {
		return this.service.remove(+param.id)
	}
}

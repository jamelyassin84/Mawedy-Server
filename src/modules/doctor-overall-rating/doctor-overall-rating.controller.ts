import { DoctorOverAllRatingDto } from './doctor-overall-rating.dto'
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
import { DoctorOverallRatingService } from './doctor-overall-rating.service'
import { DoctorOverAllRating } from './doctor-overall-rating.entity'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Doctor Over All Ratings')
@Controller(resolveAPI(ROUTES.DOCTOR_OVERALL_RATING))
export class DoctorOverallRatingController {
	constructor(private readonly service: DoctorOverallRatingService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<DoctorOverAllRating[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<DoctorOverAllRating> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: DoctorOverAllRatingDto): Promise<DoctorOverAllRating> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: DoctorOverAllRatingDto,
	): Promise<DoctorOverAllRating> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<DoctorOverAllRating> {
		return this.service.remove(+param.id)
	}
}

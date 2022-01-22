import { ClinicRatingViaGoogleDto } from './clinic-ratings-via-google.dto'
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
import { ClinicRatingViaGoogle } from './clinic-ratings-via-google.entity'
import { ClinicRatingsViaGoogleService } from './clinic-ratings-via-google.service'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Ratings Via Google')
@Controller(resolveAPI(ROUTES.CLINIC_APPOINTMENTS))
@Controller('clinic-ratings-via-google')
export class ClinicRatingsViaGoogleController {
	constructor(private readonly service: ClinicRatingsViaGoogleService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicRatingViaGoogle[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicRatingViaGoogle> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: ClinicRatingViaGoogleDto,
	): Promise<ClinicRatingViaGoogle> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicRatingViaGoogleDto,
	): Promise<ClinicRatingViaGoogle> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicRatingViaGoogle> {
		return this.service.remove(+param.id)
	}
}

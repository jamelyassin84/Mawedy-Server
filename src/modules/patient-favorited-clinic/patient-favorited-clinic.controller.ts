import { PatientFavoriteClinicDto } from './patient-favorited-clinic.dto'
import { PatientFavoritedClinicService } from './patient-favorited-clinic.service'
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
import { PatientFavoriteClinic } from './patient-favorited-clinic.entity'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Favorite Clinics')
@Controller(resolveAPI(ROUTES.PATIENT_FAVORITE_CLINIC))
export class PatientFavoritedClinicController {
	constructor(private readonly service: PatientFavoritedClinicService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<PatientFavoriteClinic[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<PatientFavoriteClinic> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: PatientFavoriteClinicDto,
	): Promise<PatientFavoriteClinic> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: PatientFavoriteClinicDto,
	): Promise<PatientFavoriteClinic> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<PatientFavoriteClinic> {
		return this.service.remove(+param.id)
	}
}

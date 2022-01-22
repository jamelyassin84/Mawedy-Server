import { ClinicPromotionDoctorDto } from './clinic-promotions-doctor.dto'
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
import { ClinicPromotionDoctor } from './clinic-promotions-doctor.entity'
import { ClinicPromotionsDoctorsService } from './clinic-promotions-doctor.service'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Promotion Doctors')
@Controller(resolveAPI(ROUTES.CLINIC_PROMOTIONS_DOCTORS))
export class ClinicPromotionsDoctorsController {
	constructor(private readonly service: ClinicPromotionsDoctorsService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicPromotionDoctor[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicPromotionDoctor> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: ClinicPromotionDoctorDto,
	): Promise<ClinicPromotionDoctor> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicPromotionDoctorDto,
	): Promise<ClinicPromotionDoctor> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicPromotionDoctor> {
		return this.service.remove(+param.id)
	}
}

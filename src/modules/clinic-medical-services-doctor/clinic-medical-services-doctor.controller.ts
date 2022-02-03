import { ClinicMedicalServiceDoctorDto } from './clinic-medical-services-doctor.dto'
import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { ClinicMedicalServiceDoctor } from './clinic-medical-services-doctor.entity'
import { ClinicMedicalServicesDoctorsService } from './clinic-medical-services-doctor.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Medical Services Doctors')
@Controller(resolveAPI(ROUTES.CLINIC_MEDICAL_SERVICES_DOCTORS))
export class ClinicMedicalServicesDoctorsController {
	constructor(
		private readonly service: ClinicMedicalServicesDoctorsService,
	) {}

	@Post()
	create(
		@Body() body: ClinicMedicalServiceDoctorDto,
	): Promise<ClinicMedicalServiceDoctor> {
		return this.service.create(body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicMedicalServiceDoctor> {
		return this.service.remove(+param.id)
	}
}

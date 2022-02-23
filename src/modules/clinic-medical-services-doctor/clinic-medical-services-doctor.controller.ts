import { ClinicMedicalServiceDoctorDto } from './clinic-medical-services-doctor.dto'
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { ROUTES } from 'src/routes/routes'
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
@Controller(ROUTES.CLINIC_MEDICAL_SERVICES_DOCTORS)
export class ClinicMedicalServicesDoctorsController {
	constructor(
		private readonly service: ClinicMedicalServicesDoctorsService,
	) {}

	@Get(':id')
	getDoctors(@Param() param) {
		return this.service.getDoctors(+param.id)
	}

	@Post()
	create(
		@Body() body: ClinicMedicalServiceDoctorDto,
	): Promise<ClinicMedicalServiceDoctor> {
		return this.service.create(body)
	}

	@Delete(':id')
	async remove(@Param() param): Promise<ClinicMedicalServiceDoctor> {
		return this.service.remove(+param.id)
	}
}

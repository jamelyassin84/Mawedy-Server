import { Controller } from '@nestjs/common'
import { ClinicMedicalServicesDoctorsService } from './clinic-medical-services-doctor.service'

@Controller('clinic-medical-services-doctors')
export class ClinicMedicalServicesDoctorsController {
	constructor(
		private readonly clinicMedicalServicesDoctorsService: ClinicMedicalServicesDoctorsService,
	) {}
}

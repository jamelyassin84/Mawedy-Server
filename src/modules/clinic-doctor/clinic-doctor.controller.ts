import { Controller } from '@nestjs/common'
import { ClinicDoctorsService } from './clinic-doctor.service'

@Controller('clinic-doctors')
export class ClinicDoctorsController {
	constructor(private readonly clinicDoctorsService: ClinicDoctorsService) {}
}

import { Controller } from '@nestjs/common'
import { ClinicPromotionsDoctorsService } from './clinic-promotions-doctor.service'

@Controller('clinic-promotions-doctors')
export class ClinicPromotionsDoctorsController {
	constructor(
		private readonly clinicPromotionsDoctorsService: ClinicPromotionsDoctorsService,
	) {}
}

import { Controller } from '@nestjs/common'
import { ClinicRatingsService } from './clinic-rating.service'

@Controller('clinic-ratings')
export class ClinicRatingsController {
	constructor(private readonly clinicRatingsService: ClinicRatingsService) {}
}

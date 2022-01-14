import { Controller } from '@nestjs/common'
import { ClinicPromotionsAnalyticsService } from './clinic-promotion-analytic.service'

@Controller('clinic-promotions-analytics')
export class ClinicPromotionsAnalyticsController {
	constructor(
		private readonly clinicPromotionsAnalyticsService: ClinicPromotionsAnalyticsService,
	) {}
}

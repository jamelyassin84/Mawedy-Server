import { Controller } from '@nestjs/common'
import { ClinicSubscriptionsRevenueService } from './clinic-subscription-revenue.service'

@Controller('clinic-subscriptions-revenue')
export class ClinicSubscriptionsRevenueController {
	constructor(
		private readonly clinicSubscriptionsRevenueService: ClinicSubscriptionsRevenueService,
	) {}
}

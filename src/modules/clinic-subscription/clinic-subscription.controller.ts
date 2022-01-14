import { Controller } from '@nestjs/common'
import { ClinicSubscriptionsService } from './clinic-subscription.service'

@Controller('clinic-subscriptions')
export class ClinicSubscriptionsController {
	constructor(
		private readonly clinicSubscriptionsService: ClinicSubscriptionsService,
	) {}
}

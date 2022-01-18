import { Module } from '@nestjs/common'
import { ClinicSubscriptionsService } from './clinic-subscription.service'
import { ClinicSubscriptionsController } from './clinic-subscription.controller'

@Module({
	controllers: [ClinicSubscriptionsController],
	providers: [ClinicSubscriptionsService],
	exports: [ClinicSubscriptionsService],
})
export class ClinicSubscriptionsModule {}

import { Module } from '@nestjs/common'
import { ClinicSubscriptionsRevenueService } from './clinic-subscription-revenue.service'
import { ClinicSubscriptionsRevenueController } from './clinic-subscription-revenue.controller'

@Module({
	controllers: [ClinicSubscriptionsRevenueController],
	providers: [ClinicSubscriptionsRevenueService],
})
export class ClinicSubscriptionsRevenueModule {}

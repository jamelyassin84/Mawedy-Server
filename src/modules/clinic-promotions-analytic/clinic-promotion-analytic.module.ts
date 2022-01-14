import { Module } from '@nestjs/common'
import { ClinicPromotionsAnalyticsService } from './clinic-promotion-analytic.service'
import { ClinicPromotionsAnalyticsController } from './clinic-promotion-analytic.controller'

@Module({
	controllers: [ClinicPromotionsAnalyticsController],
	providers: [ClinicPromotionsAnalyticsService],
})
export class ClinicPromotionsAnalyticsModule {}

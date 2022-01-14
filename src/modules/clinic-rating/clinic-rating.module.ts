import { Module } from '@nestjs/common'
import { ClinicRatingsService } from './clinic-rating.service'
import { ClinicRatingsController } from './clinic-rating.controller'

@Module({
	controllers: [ClinicRatingsController],
	providers: [ClinicRatingsService],
})
export class ClinicRatingsModule {}

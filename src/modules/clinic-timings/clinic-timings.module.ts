import { Module } from '@nestjs/common'
import { ClinicTimingsService } from './clinic-timings.service'
import { ClinicTimingsController } from './clinic-timings.controller'

@Module({
	controllers: [ClinicTimingsController],
	providers: [ClinicTimingsService],
	exports: [ClinicTimingsService],
})
export class ClinicTimingsModule {}

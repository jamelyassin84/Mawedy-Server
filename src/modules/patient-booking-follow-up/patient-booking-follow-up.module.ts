import { Module } from '@nestjs/common'
import { PatientBookingFollowUpService } from './patient-booking-follow-up.service'
import { PatientBookingFollowUpController } from './patient-booking-follow-up.controller'

@Module({
	controllers: [PatientBookingFollowUpController],
	providers: [PatientBookingFollowUpService],
	exports: [PatientBookingFollowUpService],
})
export class PatientBookingFollowUpModule {}

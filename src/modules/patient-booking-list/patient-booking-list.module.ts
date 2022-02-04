import { Module } from '@nestjs/common'
import { PatientBookingListService } from './patient-booking-list.service'
import { PatientBookingListController } from './patient-booking-list.controller'

@Module({
	controllers: [PatientBookingListController],
	providers: [PatientBookingListService],
	exports: [PatientBookingListService],
})
export class PatientBookingListModule {}

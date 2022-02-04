import { Module } from '@nestjs/common'
import { ClinicAppointmentsService } from './clinic-appointment.service'
import { ClinicAppointmentsController } from './clinic-appointment.controller'
import { PatientsBookingListFilesModule } from '../patients-booking-list-files/patients-booking-list-files.module'
import { PatientBookingListModule } from '../patient-booking-list/patient-booking-list.module'
import { PatientBookingFollowUpModule } from '../patient-booking-follow-up/patient-booking-follow-up.module'

@Module({
	imports: [
		PatientsBookingListFilesModule,
		PatientBookingListModule,
		PatientBookingFollowUpModule,
	],
	controllers: [ClinicAppointmentsController],
	providers: [ClinicAppointmentsService],
})
export class ClinicAppointmentsModule {}

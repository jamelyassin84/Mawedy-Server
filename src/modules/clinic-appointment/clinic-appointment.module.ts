import { Module } from '@nestjs/common'
import { ClinicAppointmentsService } from './clinic-appointment.service'
import { ClinicAppointmentsController } from './clinic-appointment.controller'

@Module({
	controllers: [ClinicAppointmentsController],
	providers: [ClinicAppointmentsService],
})
export class ClinicAppointmentsModule {}

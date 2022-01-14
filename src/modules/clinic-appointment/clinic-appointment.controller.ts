import { Controller } from '@nestjs/common'
import { ClinicAppointmentsService } from './clinic-appointment.service'

@Controller('clinic-appointments')
export class ClinicAppointmentsController {
	constructor(
		private readonly clinicAppointmentsService: ClinicAppointmentsService,
	) {}
}

import { Controller } from '@nestjs/common'
import { ClinicDepartmentsService } from './clinic-department.service'

@Controller('clinic-departments')
export class ClinicDepartmentsController {
	constructor(
		private readonly clinicDepartmentsService: ClinicDepartmentsService,
	) {}
}

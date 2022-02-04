import { ClinicAppointmentDto } from './clinic-appointment.dto'
import { ClinicAppointmentsService } from './clinic-appointment.service'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { ClinicAppointment } from './clinic-appointment.entity'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Appointments')
@Controller(resolveAPI(ROUTES.CLINIC_APPOINTMENTS))
export class ClinicAppointmentsController {
	constructor(private readonly service: ClinicAppointmentsService) {}

	@Get()
	async findAll(@Param() param): Promise<ClinicAppointment[]> {
		return this.service.findAll(param)
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<ClinicAppointment> {
		return this.service.findOne(+id)
	}

	@Post()
	create(@Body() body: ClinicAppointmentDto): Promise<ClinicAppointment> {
		return this.service.create(body)
	}

	@Patch(':id')
	async update(
		@Param() param,
		@Body() body: ClinicAppointmentDto,
	): Promise<ClinicAppointment> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	async remove(@Param() param): Promise<ClinicAppointment> {
		return this.service.remove(+param.id)
	}
}

import { ClinicDoctorWorkingScheduleDto } from './clinic-doctor-working-schedule.dto'
import { ClinicDoctorWorkingSchedule } from './clinic-doctor-working-schedule.entity'
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
import { ClinicDoctorWorkingScheduleService } from './clinic-doctor-working-schedule.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Doctor Working Schedule')
@Controller(resolveAPI(ROUTES.CLINIC_DOCTORS_WORKING_SCHEDULES))
export class ClinicDoctorWorkingScheduleController {
	constructor(private readonly service: ClinicDoctorWorkingScheduleService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicDoctorWorkingSchedule[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicDoctorWorkingSchedule> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: ClinicDoctorWorkingScheduleDto,
	): Promise<ClinicDoctorWorkingSchedule> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicDoctorWorkingScheduleDto,
	): Promise<ClinicDoctorWorkingSchedule> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicDoctorWorkingSchedule> {
		return this.service.remove(+param.id)
	}
}

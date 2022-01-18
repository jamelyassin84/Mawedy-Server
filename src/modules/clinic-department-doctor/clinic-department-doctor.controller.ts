import { ClinicDepartmentDoctorDto } from './clinic-department-doctor.dto'
import { ClinicDepartmentDoctor } from './clinic-department-doctor.entity'
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
import { ClinicDepartmentDoctorService } from './clinic-department-doctor.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Appointments')
@Controller(resolveAPI(ROUTES.CLINIC_APPOINTMENTS))
export class ClinicDepartmentDoctorController {
	constructor(private readonly service: ClinicDepartmentDoctorService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicDepartmentDoctor[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicDepartmentDoctor> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: ClinicDepartmentDoctorDto,
	): Promise<ClinicDepartmentDoctor> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicDepartmentDoctorDto,
	): Promise<ClinicDepartmentDoctor> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicDepartmentDoctor> {
		return this.service.remove(+param.id)
	}
}

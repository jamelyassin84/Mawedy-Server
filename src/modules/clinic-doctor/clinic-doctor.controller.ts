import { ClinicDoctorDto } from './clinic-doctor.dto'
import { ClinicDoctor } from './clinic-doctor.entity'
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
import { ClinicDoctorsService } from './clinic-doctor.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Doctors')
@Controller(resolveAPI(ROUTES.CLINIC_DOCTORS))
export class ClinicDoctorsController {
	constructor(private readonly service: ClinicDoctorsService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicDoctor[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicDoctor> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: ClinicDoctorDto): Promise<ClinicDoctor> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicDoctorDto,
	): Promise<ClinicDoctor> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicDoctor> {
		return this.service.remove(+param.id)
	}
}

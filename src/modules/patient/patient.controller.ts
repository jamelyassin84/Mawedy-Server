import { Controller } from '@nestjs/common'
import {
	Body,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { PatientService } from './patient.service'
import { PatientDto } from './patient.dto'
import { Patient } from './patient.entity'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Patients')
@Controller(resolveAPI(ROUTES.PATIENTS))
export class PatientController {
	constructor(private readonly service: PatientService) {}
	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<Patient[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<Patient> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: PatientDto): Promise<Patient> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(@Param() param, @Body() body: PatientDto): Promise<Patient> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<Patient> {
		return this.service.remove(+param.id)
	}
}

import { PatientMedicalRecordDto } from './patient-medical-record.dto'
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
import { PatientMedicalRecord } from './patient-medical-record.entity'
import { PatientMedicalRecordService } from './patient-medical-record.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Patient Medical Records')
@Controller(resolveAPI(ROUTES.PATIENT_MEDICAL_RECORDS))
export class PatientMedicalRecordController {
	constructor(private readonly service: PatientMedicalRecordService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<PatientMedicalRecord[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<PatientMedicalRecord> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: PatientMedicalRecordDto,
	): Promise<PatientMedicalRecord> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: PatientMedicalRecordDto,
	): Promise<PatientMedicalRecord> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<PatientMedicalRecord> {
		return this.service.remove(+param.id)
	}
}

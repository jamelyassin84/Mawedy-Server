import { ClinicMedicalServiceDto } from './clinic-medical-service.dto'
import { ClinicMedicalService } from './clinic-medical-service.entity'
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
import { ClinicMedicalServiceService } from './clinic-medical-service.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Medical Services')
@Controller(resolveAPI(ROUTES.CLINIC_MEDICAL_SERVICES))
export class ClinicMedicalServiceController {
	constructor(private readonly service: ClinicMedicalServiceService) {}

	@Get()
	async findAll(): Promise<ClinicMedicalService[]> {
		return this.service.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<ClinicMedicalService> {
		return this.service.findOne(+id)
	}

	@Post()
	create(
		@Body() body: ClinicMedicalServiceDto,
	): Promise<ClinicMedicalService> {
		return this.service.create(body)
	}

	@Patch(':id')
	async update(
		@Param() param,
		@Body() body: ClinicMedicalServiceDto,
	): Promise<ClinicMedicalService> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	async remove(@Param() param): Promise<ClinicMedicalService> {
		return this.service.remove(+param.id)
	}

	@Get('department/:id')
	async getByDepartment(@Param() param): Promise<any> {
		return this.service.getByDepartment(+param.id)
	}

	@Post('search')
	search(
		@Body() body: { keyword: string; department: string },
	): Promise<ClinicMedicalService[]> {
		return this.service.search(body)
	}
}

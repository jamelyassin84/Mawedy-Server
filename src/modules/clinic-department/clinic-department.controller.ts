import { ClinicDepartmentsService } from './clinic-department.service'
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
import { ClinicDepartmentDto } from './clinic-department.dto'
import { ClinicDepartment } from './clinic-department.enitiy'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Departments')
@Controller(resolveAPI(ROUTES.CLINIC_DEPARTMENT))
export class ClinicDepartmentsController {
	constructor(private readonly service: ClinicDepartmentsService) {}

	@Get()
	async findAll(): Promise<ClinicDepartment[]> {
		return this.service.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<ClinicDepartment> {
		return this.service.findOne(+id)
	}

	@Post()
	create(@Body() body: ClinicDepartmentDto): Promise<ClinicDepartment> {
		return this.service.create(body)
	}

	@Patch(':id')
	async update(
		@Param() param,
		@Body() body: ClinicDepartmentDto,
	): Promise<ClinicDepartment> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	async remove(@Param() param): Promise<ClinicDepartment> {
		return this.service.remove(+param.id)
	}

	@Get('clinic/:id')
	async getDepartmentByClinic(@Param() param): Promise<ClinicDepartment[]> {
		return this.service.getDepartmentByClinic(+param.id)
	}
}

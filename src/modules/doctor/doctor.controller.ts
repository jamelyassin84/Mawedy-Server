import { DoctorDto } from './doctor.dto'
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
import { Doctor } from './doctor.entity'
import { DoctorService } from './doctor.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Doctor')
@Controller(resolveAPI(ROUTES.DOCTOR))
export class DoctorController {
	constructor(private readonly service: DoctorService) {}

	@Get()
	async findAll(): Promise<Doctor[]> {
		return this.service.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Doctor> {
		return this.service.findOne(+id)
	}

	@Post()
	create(@Body() body: DoctorDto): Promise<Doctor> {
		return this.service.create(body)
	}

	@Patch(':id')
	async update(@Param() param, @Body() body: DoctorDto): Promise<Doctor> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	async remove(@Param() param): Promise<Doctor> {
		return this.service.remove(+param.id)
	}
}

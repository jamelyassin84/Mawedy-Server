import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	Param,
	Patch,
	Delete,
} from '@nestjs/common'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { ClinicDto } from './clinic.dto'
import { Clinic } from './clinic.entity'
import { ClinicService } from './clinic.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinics')
@Controller(resolveAPI(ROUTES.CLINICS))
export class ClinicController {
	constructor(private readonly service: ClinicService) {}

	@Get()
	// @UseGuards(JwtAuthGuard)
	async findAll(): Promise<Clinic[]> {
		return this.service.findAll()
	}

	@Get(':id')
	// @UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<Clinic> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() createAdminDto: ClinicDto): Promise<Clinic> {
		return this.service.create(createAdminDto)
	}

	@Patch(':id')
	// @UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() createAdminDto: ClinicDto,
	): Promise<Clinic> {
		return this.service.update(param.id, createAdminDto)
	}

	@Delete(':id')
	// @UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<Clinic> {
		return this.service.remove(+param.id)
	}
}

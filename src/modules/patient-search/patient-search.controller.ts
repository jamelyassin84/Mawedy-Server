import { PatientSearchDto } from './patient-search.dto'
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
import { PatientSearch } from './patient-search.entity'
import { PatientSearchService } from './patient-search.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Patient Searches')
@Controller(resolveAPI(ROUTES.PATIENT_SEARCHES))
export class PatientSearchController {
	constructor(private readonly service: PatientSearchService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<PatientSearch[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<PatientSearch> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: PatientSearchDto): Promise<PatientSearch> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: PatientSearchDto,
	): Promise<PatientSearch> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<PatientSearch> {
		return this.service.remove(+param.id)
	}
}

import { ClinicFollowUpDto } from './clinic-follow-up-check-up.dto'
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
import { ClinicFollowUp } from './clinic-follow-up-check-up.entity'
import { ClinicFollowUpCheckUpService } from './clinic-follow-up-check-up.service'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Follow Up Check-ups')
@Controller(resolveAPI(ROUTES.CLINIC_FOLLOW_UP_CHECK_UPS))
export class ClinicFollowUpCheckUpController {
	constructor(private readonly service: ClinicFollowUpCheckUpService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicFollowUp[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicFollowUp> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: ClinicFollowUpDto): Promise<ClinicFollowUp> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicFollowUpDto,
	): Promise<ClinicFollowUp> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicFollowUp> {
		return this.service.remove(+param.id)
	}
}

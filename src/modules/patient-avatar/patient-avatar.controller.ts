import { PatientAvatarDto } from './patient-avatar.dto'
import { PatientAvatar } from './patient-avatar.enitity'
import { PatientAvatarService } from './patient-avatar.service'

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

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Patient Avatars')
@Controller(resolveAPI(ROUTES.PATIENT_AVATARS))
export class PatientAvatarController {
	constructor(private readonly service: PatientAvatarService) {}
	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<PatientAvatar[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<PatientAvatar> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: PatientAvatarDto): Promise<PatientAvatar> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: PatientAvatarDto,
	): Promise<PatientAvatar> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<PatientAvatar> {
		return this.service.remove(+param.id)
	}
}

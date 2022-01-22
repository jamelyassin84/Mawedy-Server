import { ClinicAvatarsService } from './clinic-avatar.service'
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
import { ClinicAvatar } from './clinic-avatar.entity'
import { ClinicAvatarDto } from './clinic-avatar.dto'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Avatars')
@Controller(resolveAPI(ROUTES.CLINIC_AVATARS))
export class ClinicAvatarsController {
	constructor(private readonly service: ClinicAvatarsService) {}
	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicAvatar[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicAvatar> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: ClinicAvatarDto): Promise<ClinicAvatar> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicAvatarDto,
	): Promise<ClinicAvatar> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicAvatar> {
		return this.service.remove(+param.id)
	}
}

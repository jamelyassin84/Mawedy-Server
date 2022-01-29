import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { ClinicAccountDto } from './clinic-account.dto'
import { ClinicAccount } from './clinic-account.entity'
import { ClinicAccountService } from './clinic-account.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Accounts')
@Controller(resolveAPI(ROUTES.CLINIC_ACCOUNTS))
export class ClinicAccountController {
	constructor(private readonly service: ClinicAccountService) {}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<ClinicAccount> {
		return this.service.findOne(+id)
	}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	create(@Body() body: ClinicAccountDto): Promise<ClinicAccount> {
		return this.service.create(body)
	}

	@Patch(':id')
	async update(
		@Param() param,
		@Body() body: ClinicAccountDto,
	): Promise<ClinicAccount> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	async remove(@Param() param): Promise<ClinicAccount> {
		return this.service.remove(+param.id)
	}

	@Get('clinic/:id')
	findClinic(@Param('id') id: string): Promise<ClinicAccount[]> {
		return this.service.findByClinic(+id)
	}

	@Post('log-in')
	logIn(@Body() body: { id: number }) {
		return this.service.logIn(body.id)
	}
}

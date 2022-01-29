import { EmailDto } from './email.dto'
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
import { Email } from './email.entity'
import { EmailsService } from './email.service'
import { ROUTES } from 'src/routes/routes'
@ApiTags('Email')
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@Controller(ROUTES.EMAILS)
export class EmailsController {
	constructor(private readonly service: EmailsService) {}

	@Post()
	create(@Body() body: EmailDto): Promise<Email> {
		return this.service.create(body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<Email> {
		return this.service.remove(+param.id)
	}

	@Post('check-if-exist')
	async checkIfExist(@Body() body): Promise<boolean> {
		return this.service.checkIfEmailExist(body.email)
	}
}

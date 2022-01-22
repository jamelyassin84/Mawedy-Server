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

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<Email[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<Email> {
		return this.service.findOne(+id)
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() body: EmailDto): Promise<Email> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(@Param() param, @Body() body: EmailDto | any): Promise<Email> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<Email> {
		return this.service.remove(+param.id)
	}
}

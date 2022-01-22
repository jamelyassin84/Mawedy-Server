import { MawedyInboxService } from './mawedy-inbox.service'
import { AppInboxDto } from './mawedy-inbox.dto'
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
import { AppInbox } from './mawedy-inbox.entity'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('App Inbox')
@Controller(resolveAPI(ROUTES.APP_INBOX))
export class MawedyInboxController {
	constructor(private readonly service: MawedyInboxService) {}
	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<AppInbox[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<AppInbox> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: AppInboxDto): Promise<AppInbox> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(@Param() param, @Body() body: AppInboxDto): Promise<AppInbox> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<AppInbox> {
		return this.service.remove(+param.id)
	}
}

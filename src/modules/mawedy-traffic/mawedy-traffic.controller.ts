import { AppTrafficDto } from './mawedy-traffic.dto'
import { MawedyTrafficService } from './mawedy-traffic.service'

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
import { AppTraffic } from './mawedy-traffic.entity'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('App Traffics')
@Controller(resolveAPI(ROUTES.APP_TRAFFICS))
export class MawedyTrafficController {
	constructor(private readonly service: MawedyTrafficService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<AppTraffic[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<AppTraffic> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: AppTrafficDto): Promise<AppTraffic> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: AppTrafficDto,
	): Promise<AppTraffic> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<AppTraffic> {
		return this.service.remove(+param.id)
	}
}

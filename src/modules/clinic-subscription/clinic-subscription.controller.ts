import { ClinicSubscriptionDto } from './clinic-subscription.dto'
import { ClinicSubscription } from './clinic-subscription.entity'
import { Controller } from '@nestjs/common'
import { ClinicSubscriptionsService } from './clinic-subscription.service'
import {
	Body,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Subscriptions')
@Controller(resolveAPI(ROUTES.CLINIC_SUBSCRIPTIONS))
export class ClinicSubscriptionsController {
	constructor(private readonly service: ClinicSubscriptionsService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicSubscription[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicSubscription> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: ClinicSubscriptionDto): Promise<ClinicSubscription> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicSubscriptionDto,
	): Promise<ClinicSubscription> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicSubscription> {
		return this.service.remove(+param.id)
	}
}

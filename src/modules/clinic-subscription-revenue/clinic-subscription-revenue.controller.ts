import { ClinicSubscriptionRevenueDto } from './clinic-subscription-revenue.dto'
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
import { ClinicSubscriptionRevenue } from './clinic-subscription-revenue.entity'
import { ClinicSubscriptionsRevenueService } from './clinic-subscription-revenue.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Subscriptions Revenues')
@Controller(resolveAPI(ROUTES.CLINIC_SUBSCRIPTIONS_REVENUES))
export class ClinicSubscriptionsRevenueController {
	constructor(private readonly service: ClinicSubscriptionsRevenueService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicSubscriptionRevenue[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicSubscriptionRevenue> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: ClinicSubscriptionRevenueDto,
	): Promise<ClinicSubscriptionRevenue> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicSubscriptionRevenueDto,
	): Promise<ClinicSubscriptionRevenue> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicSubscriptionRevenue> {
		return this.service.remove(+param.id)
	}
}

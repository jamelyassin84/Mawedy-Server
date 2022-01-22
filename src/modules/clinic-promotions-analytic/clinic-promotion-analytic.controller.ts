import { ClinicPromotionAnalyticDto } from './clinic-promotion-analytic.dto'
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
import { ClinicPromotionsAnalyticsService } from './clinic-promotion-analytic.service'
import { ClinicPromotionAnalytic } from './clinic-promotion-analytic.entity'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Promotion Analytics')
@Controller(resolveAPI(ROUTES.CLINIC_PROMOTIONS_ANALYTICS))
export class ClinicPromotionsAnalyticsController {
	constructor(private readonly service: ClinicPromotionsAnalyticsService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicPromotionAnalytic[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicPromotionAnalytic> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: ClinicPromotionAnalyticDto,
	): Promise<ClinicPromotionAnalytic> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicPromotionAnalyticDto,
	): Promise<ClinicPromotionAnalytic> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicPromotionAnalytic> {
		return this.service.remove(+param.id)
	}
}

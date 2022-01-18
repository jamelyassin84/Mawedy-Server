import { PatientBookingListDto } from './patient-booking-list.dto'
import { PatientBookingList } from './patient-booking-list.entity'
import { PatientBookingListService } from './patient-booking-list.service'

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
@ApiTags('Patient Booking Lists')
@Controller(resolveAPI(ROUTES.PATIENT_BOOKING_LISTS))
export class PatientBookingListController {
	constructor(private readonly service: PatientBookingListService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<PatientBookingList[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<PatientBookingList> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(@Body() body: PatientBookingListDto): Promise<PatientBookingList> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: PatientBookingListDto,
	): Promise<PatientBookingList> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<PatientBookingList> {
		return this.service.remove(+param.id)
	}
}

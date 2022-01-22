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
import { PatientBookingFollowUpDto } from './patient-booking-follow-up.dto'
import { PatientBookingFollowUp } from './patient-booking-follow-up.entity'
import { PatientBookingFollowUpService } from './patient-booking-follow-up.service'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Patient Booking Follow Ups')
@Controller(resolveAPI(ROUTES.PATIENT_BOOKING_FOLLOWUPS))
export class PatientBookingFollowUpController {
	constructor(private readonly service: PatientBookingFollowUpService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<PatientBookingFollowUp[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<PatientBookingFollowUp> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: PatientBookingFollowUpDto,
	): Promise<PatientBookingFollowUp> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: PatientBookingFollowUpDto,
	): Promise<PatientBookingFollowUp> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<PatientBookingFollowUp> {
		return this.service.remove(+param.id)
	}
}

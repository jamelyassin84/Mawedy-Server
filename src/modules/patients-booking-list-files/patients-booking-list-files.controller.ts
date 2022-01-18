import { PatientBookingListFileDto } from './patients-booking-list-files.dto'
import { PatientBookingListFile } from './patients-booking-list-files.entity'
import { PatientsBookingListFilesService } from './patients-booking-list-files.service'
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
@ApiTags('Patient Booking List Files')
@Controller(resolveAPI(ROUTES.PATIENT_BOOKING_LISTS_FILES))
export class PatientsBookingListFilesController {
	constructor(private readonly service: PatientsBookingListFilesService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<PatientBookingListFile[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<PatientBookingListFile> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: PatientBookingListFileDto,
	): Promise<PatientBookingListFile> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: PatientBookingListFileDto,
	): Promise<PatientBookingListFile> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<PatientBookingListFile> {
		return this.service.remove(+param.id)
	}
}

import { ClinicMedicalServiceImageDto } from './clinic-medical-service-image.dto'
import { ClinicMedicalServiceImage } from './clinic-medical-service-image.entity'
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
import { ClinicMedicalServiceImageService } from './clinic-medical-service-image.service'

@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinic Medical Service Image')
@Controller(resolveAPI(ROUTES.CLINIC_MEDICAL_SERVICES_IMAGES))
export class ClinicMedicalServiceImageController {
	constructor(private readonly service: ClinicMedicalServiceImageService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<ClinicMedicalServiceImage[]> {
		return this.service.findAll()
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<ClinicMedicalServiceImage> {
		return this.service.findOne(+id)
	}

	@Post()
	// @UseGuards(JwtAuthGuard)
	create(
		@Body() body: ClinicMedicalServiceImageDto,
	): Promise<ClinicMedicalServiceImage> {
		return this.service.create(body)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param() param,
		@Body() body: ClinicMedicalServiceImageDto,
	): Promise<ClinicMedicalServiceImage> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<ClinicMedicalServiceImage> {
		return this.service.remove(+param.id)
	}
}

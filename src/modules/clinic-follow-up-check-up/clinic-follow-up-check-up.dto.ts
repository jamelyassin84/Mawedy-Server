import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicFileDto {
	@IsNotEmpty()
	@ApiProperty()
	doctorId?: number

	@IsNotEmpty()
	@ApiProperty()
	patientId?: number

	@IsNotEmpty()
	@ApiProperty()
	clinicMedicalServiceId?: number

	clinic?: Clinic
}

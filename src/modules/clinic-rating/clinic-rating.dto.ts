import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'
import { Patient } from '../patient/patient.entity'

export class ClinicRatingDto {
	@IsNotEmpty()
	@ApiProperty()
	rating: number = 0

	patient?: Patient
	clinic: Clinic
}

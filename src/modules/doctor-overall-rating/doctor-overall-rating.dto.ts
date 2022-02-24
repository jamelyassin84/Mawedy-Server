import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Patient } from '../patients/patient/patient.entity'

export class DoctorOverAllRatingDto {
	@IsNotEmpty()
	@ApiProperty()
	rating: number = 0

	patient: Patient
}

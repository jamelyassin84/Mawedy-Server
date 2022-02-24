import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'
import { Patient } from '../patients/patient/patient.entity'

export class DoctorRatingDto {
	@IsNotEmpty()
	@ApiProperty()
	rating: number = 0

	clinic?: Clinic
	patient: Patient
}

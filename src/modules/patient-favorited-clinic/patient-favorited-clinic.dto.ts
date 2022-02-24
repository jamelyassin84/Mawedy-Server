import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
import { Patient } from '../patients/patient/patient.entity'
export class PatientFavoriteClinicDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	clinicId: number

	patient: Patient
}

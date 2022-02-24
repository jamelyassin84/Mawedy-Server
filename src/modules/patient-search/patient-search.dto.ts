import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
import { Patient } from '../patients/patient/patient.entity'
export class PatientSearchDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	keyword: string

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	results: string

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	type: 'clinic' | 'doctor'

	patient: Patient
}

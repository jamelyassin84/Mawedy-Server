import { ApiProperty } from '@nestjs/swagger'
import { Patient } from '../patients/patient/patient.entity'
export class PatientAvatarDto {
	@ApiProperty()
	url?: string

	@ApiProperty()
	patient: Patient
}

import { Patient } from 'src/modules/patient/patient.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
export class PatientAvatarDto {
	@ApiProperty()
	url?: string

	@ApiProperty()
	patient: Patient
}

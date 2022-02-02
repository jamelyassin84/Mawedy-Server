import { Patient } from 'src/modules/patient/patient.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
export class PatientAvatarDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	url: string

	@ApiProperty()
	patient: Patient

	@ApiProperty()
	avatar?: FormData[]
}

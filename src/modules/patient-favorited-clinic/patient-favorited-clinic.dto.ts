import { Patient } from 'src/modules/patient/patient.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
export class PatientFavoriteClinicDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	clinicId: number

	patient: Patient
}

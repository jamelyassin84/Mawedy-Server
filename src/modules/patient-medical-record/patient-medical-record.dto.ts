import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
export class PatientMedicalRecordDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	clinicId: number

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	patientId: number

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	doctorId: number

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	bookListId: number
}

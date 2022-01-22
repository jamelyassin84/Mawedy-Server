import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicPatientDto {
	@IsNotEmpty()
	@ApiProperty()
	isRegular: boolean = false

	@IsNotEmpty()
	@ApiProperty()
	isValued: boolean = false

	@IsNotEmpty()
	@ApiProperty()
	isActive: boolean = true

	@IsNotEmpty()
	@ApiProperty()
	patientId: number

	clinic?: Clinic
}

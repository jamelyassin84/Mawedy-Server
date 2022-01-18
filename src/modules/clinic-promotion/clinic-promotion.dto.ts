import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicPatientDto {
	@IsNotEmpty()
	@ApiProperty()
	startAt: Date

	@IsNotEmpty()
	@ApiProperty()
	valid_until: Date

	@IsNotEmpty()
	@ApiProperty()
	highlights: string

	@IsNotEmpty()
	@ApiProperty()
	termsAndConditions: string

	@IsNotEmpty()
	@ApiProperty()
	discount: number

	@IsNotEmpty()
	@ApiProperty()
	isActive: boolean = true

	clinic?: Clinic
}

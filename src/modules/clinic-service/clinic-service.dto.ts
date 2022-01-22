import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicServiceEntityDto {
	@IsNotEmpty()
	@ApiProperty()
	name: string

	@IsNotEmpty()
	@ApiProperty()
	isActive: boolean = true

	clinic?: Clinic
}

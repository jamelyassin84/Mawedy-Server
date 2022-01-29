import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicDepartmentDto {
	@IsNotEmpty()
	@ApiProperty()
	name: string

	@ApiProperty()
	isActive: boolean = true

	clinicId?: number
}

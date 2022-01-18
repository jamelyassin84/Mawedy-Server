import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicAvatarDto {
	@IsNotEmpty()
	@ApiProperty()
	avatar?: string

	@ApiProperty()
	isActive?: boolean

	@ApiProperty()
	clinic?: Clinic
}

import { ApiProperty } from '@nestjs/swagger'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicAvatarDto {
	@ApiProperty()
	avatar: any

	@ApiProperty()
	isActive?: boolean = true

	clinic?: Clinic
}

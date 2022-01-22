import { ApiProperty } from '@nestjs/swagger'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicAvatarDto {
	@ApiProperty()
	avatar?: string | null = null

	@ApiProperty()
	isActive?: boolean = true

	clinic?: Clinic
}

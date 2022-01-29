import { ApiProperty } from '@nestjs/swagger'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicPhotoDto {
	@ApiProperty()
	avatar: any

	@ApiProperty()
	isActive?: boolean = true

	clinic?: Clinic
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicPromotionPhotoDto {
	@IsNotEmpty()
	@ApiProperty()
	url: string

	@IsNotEmpty()
	@ApiProperty()
	clinicPromotionId: number

	@IsNotEmpty()
	@ApiProperty()
	isActive: boolean = true

	clinic?: Clinic
}

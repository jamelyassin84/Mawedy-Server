import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicRatingViaGoogleDto {
	@IsNotEmpty()
	@ApiProperty()
	rating: number = 0

	clinic?: Clinic
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicPromotionAnalyticDto {
	@IsNotEmpty()
	@ApiProperty()
	reached: boolean = false

	@IsNotEmpty()
	@ApiProperty()
	viewed: boolean = false

	@IsNotEmpty()
	@ApiProperty()
	doctorId: number

	clinic?: Clinic
}

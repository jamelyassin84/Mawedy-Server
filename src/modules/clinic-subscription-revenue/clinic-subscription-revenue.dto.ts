import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'

export class ClinicSubscriptionRevenueDto {
	@IsNotEmpty()
	@ApiProperty()
	amount: number = 0

	@IsNotEmpty()
	@ApiProperty()
	clinic_id?: number

	@IsNotEmpty()
	@ApiProperty()
	clinicSubscriptionId?: number
}

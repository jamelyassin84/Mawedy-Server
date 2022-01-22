import { ClinicSubscription } from './../clinic-subscription/clinic-subscription.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Clinic } from '../clinic/clinic.entity'
import { BaseEntity } from 'typeorm'

export class ClinicAccountDto extends BaseEntity {
	@IsNotEmpty()
	@ApiProperty()
	name: string

	@ApiProperty()
	isActive: boolean = true

	@ApiProperty()
	isLoggedIn: boolean = false

	clinic: Clinic
	ClinicSubscription: ClinicSubscription
}

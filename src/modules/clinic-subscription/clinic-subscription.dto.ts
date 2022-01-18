import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ClinicSubscriptionDto {
	@IsNotEmpty()
	@ApiProperty()
	name: string

	@ApiProperty()
	isActive?: boolean

	@ApiProperty()
	isLoggedIn?: boolean

	@ApiProperty()
	subscriptionType: SubscriptionType

	@ApiProperty()
	subscribedAt: Date

	@ApiProperty()
	validUntil: Date

	@ApiProperty()
	numberOfAccounts: number

	@ApiProperty()
	price: number

	@ApiProperty()
	currency: string | 'AED'

	@ApiProperty()
	maxNumberOfAccounts: number
}

export type SubscriptionType = 'trial' | 'solution' | 'app' | 'premium'

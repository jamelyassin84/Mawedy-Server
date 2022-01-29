import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ClinicSubscriptionDto {
	@IsNotEmpty()
	@ApiProperty()
	name: string

	@ApiProperty()
	isActive?: boolean = true

	@ApiProperty()
	isLoggedIn?: boolean = false

	@ApiProperty()
	subscriptionType: SubscriptionType

	@ApiProperty()
	subscribedAt: Date

	@ApiProperty()
	validUntil: Date

	@ApiProperty()
	numberOfAccounts: number = 2

	@ApiProperty()
	price: number = 0

	@ApiProperty()
	currency?: string = 'AED'
}

export type SubscriptionType = 'trial' | 'solution' | 'app' | 'premium'

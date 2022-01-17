import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthLoginDto {
	@ApiProperty()
	username: string | undefined

	@ApiProperty()
	@IsNotEmpty()
	password: string

	@ApiProperty()
	@IsNotEmpty()
	type: UserType

	ipAddress: string
}

export type UserType =
	| 'doctor'
	| 'patient'
	| 'clinic'
	| 'clinic-accounts'
	| 'admin'

import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthLoginDto {
	@ApiProperty()
	@IsEmail()
	username: string | undefined

	@ApiProperty()
	@IsNotEmpty()
	password: string

	@ApiProperty()
	@IsEmail()
	type: UserType
}

export type UserType = 'admin' | 'clinic' | 'clinic-account' | 'patient'

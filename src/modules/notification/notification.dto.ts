import { UserType } from './../../authentication/auth-login.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty } from 'class-validator'
export class NotificationDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	message: string

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	fromType: UserType

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	from: number

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	toType: UserType

	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	to: number

	@ApiProperty()
	frontEndRedirectUrl: string | null = null
}

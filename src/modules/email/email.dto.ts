import { UserType } from './../../authentication/auth-login.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'

export class EmailDto {
	@IsNotEmpty()
	@ApiProperty()
	admin: Admin

	@IsNotEmpty()
	@ApiProperty()
	role: UserType

	@IsNotEmpty()
	@ApiProperty()
	userType: UserType

	@IsNotEmpty()
	@ApiProperty()
	email: string

	@ApiProperty()
	isActive: boolean | true
}

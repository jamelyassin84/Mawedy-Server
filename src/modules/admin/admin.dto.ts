import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateAdminDto {
	@ApiProperty()
	id: number

	@IsNotEmpty()
	@ApiProperty()
	username: string

	@IsNotEmpty()
	@ApiProperty()
	password: string

	@ApiProperty()
	avatar: string | null

	@ApiProperty()
	isActive: boolean | true

	@ApiProperty()
	isLoggedIn: boolean | false
}

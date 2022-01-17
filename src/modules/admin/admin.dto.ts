import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateAdminDto {
	id: number

	@IsNotEmpty()
	@ApiProperty()
	username: string

	@IsNotEmpty()
	@ApiProperty()
	password: string

	@ApiProperty()
	avatar: string | null | undefined

	@ApiProperty()
	isActive: boolean | true

	@ApiProperty()
	isLoggedIn: boolean | false
}

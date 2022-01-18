import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateAdminDto {
	@IsNotEmpty()
	@ApiProperty()
	email?: string

	@IsNotEmpty()
	@ApiProperty()
	phone: number

	@ApiProperty()
	areaCode?: number = 971

	@IsNotEmpty()
	@ApiProperty()
	role?: AdminRoles = 'staff'

	@IsNotEmpty()
	@ApiProperty()
	username: string

	@IsNotEmpty()
	@ApiProperty()
	password: string

	@ApiProperty()
	avatar: string | null = null

	@ApiProperty()
	isActive?: boolean = true

	@ApiProperty()
	isLoggedIn?: boolean = false
}

export type AdminRoles = 'super' | 'admin' | 'staff'

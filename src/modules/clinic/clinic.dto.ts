import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'

export class ClinicDto {
	@IsNotEmpty()
	@ApiProperty()
	email?: string

	@IsNotEmpty()
	@ApiProperty()
	phone?: string

	@ApiProperty()
	areaCode?: number = 971

	@IsNotEmpty()
	@ApiProperty()
	username: string

	@IsNotEmpty()
	@ApiProperty()
	password?: string | null = null

	@ApiProperty()
	avatar: string | null | undefined

	@IsNotEmpty()
	@ApiProperty()
	tradeLicenseNumber: string = null

	@ApiProperty()
	address: string | null = null

	@ApiProperty()
	description?: string | null = null

	@ApiProperty()
	longitude?: number | null = null

	@ApiProperty()
	latitude?: number | null = null

	@ApiProperty()
	instagram?: string | null = null

	@ApiProperty()
	google?: string | null = null

	@ApiProperty()
	facebook?: string | null = null

	@ApiProperty()
	apple?: string | null = null

	@ApiProperty()
	isApproved: boolean = false

	@IsNotEmpty()
	@ApiProperty()
	registeredVia?: 'web' | 'app'

	@ApiProperty()
	isActive?: boolean = true

	@ApiProperty()
	isLoggedIn?: boolean = false

	@ApiProperty()
	message: string | null = null

	@ApiProperty()
	isRead: boolean = false

	approver: Admin
}

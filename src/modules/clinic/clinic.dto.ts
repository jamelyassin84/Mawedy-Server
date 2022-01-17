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
	areaCode?: string

	@IsNotEmpty()
	@ApiProperty()
	role?: AdminRoles

	@IsNotEmpty()
	@ApiProperty()
	username?: string

	@IsNotEmpty()
	@ApiProperty()
	password: string

	@ApiProperty()
	avatar: string | null | undefined

	@IsNotEmpty()
	@ApiProperty()
	tradeLicenseNumber: string

	@IsNotEmpty()
	@ApiProperty()
	address: string

	@ApiProperty()
	description?: string

	@ApiProperty()
	longitude?: string

	@ApiProperty()
	latitude?: string

	@ApiProperty()
	instagram?: string

	@ApiProperty()
	google?: string

	@ApiProperty()
	facebook?: string

	@ApiProperty()
	apple?: string

	@ApiProperty()
	isApproved: boolean | false

	@IsNotEmpty()
	@ApiProperty()
	registeredVia?: 'Web' | 'Sales' | 'Admin'

	@ApiProperty()
	isActive?: boolean | true

	@ApiProperty()
	isLoggedIn?: boolean | false

	approver: Admin
}

export type AdminRoles = 'super' | 'admin' | 'staff'

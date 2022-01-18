import { Admin } from './../admin/admin.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty, IsNotEmptyObject } from 'class-validator'
import { AdminRoles } from '../admin/admin.dto'

export class RoleDto {
	@IsNotEmpty()
	@IsNotEmptyObject()
	@IsDefined()
	@ApiProperty()
	admin: Admin

	@ApiProperty()
	role: AdminRoles = 'staff'

	@ApiProperty()
	isActive: boolean = true
}

import { Admin } from './../admin/admin.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { AdminRoles } from '../admin/admin.dto'

export class RoleDto {
	@IsNotEmpty()
	@ApiProperty()
	admin: Admin

	@IsNotEmpty()
	@ApiProperty()
	role: AdminRoles

	@ApiProperty()
	isActive: boolean | true
}

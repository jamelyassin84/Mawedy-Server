import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, isDefined, IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'

export class AppInboxDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	message: string

	clinic?: Admin
}

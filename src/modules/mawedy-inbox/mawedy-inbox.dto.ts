import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, isDefined, IsNotEmpty } from 'class-validator'
import { Admin } from '../admin/admin.entity'
import { Clinic } from '../clinic/clinic.entity'

export class AppInboxDto {
	@IsNotEmpty()
	@IsDefined()
	@ApiProperty()
	message: string

	@ApiProperty()
	isRead: boolean = false

	clinic?: Clinic
	admin?: Admin
}

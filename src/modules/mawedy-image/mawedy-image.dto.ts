import { ApiProperty } from '@nestjs/swagger'
import { Admin } from '../admin/admin.entity'

export class AppImagesDto {
	@ApiProperty()
	order: number = 1

	@ApiProperty()
	url: boolean = true

	admin?: Admin
}
